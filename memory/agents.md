# AGENTS.md – Role Definitions

---

## 1. Supervisor

**File:** `execution_plane/supervisor.py`
**Model role:** `reasoning` (highest-capability model)
**Capability required:** `read_memory`

### Responsibilities
- Read `tool_outputs["task"]` and `memory_slice` from state
- Generate a numbered, actionable plan and write it to `state["plan"]`
- Cannot call models directly (goes through ModelRouter)
- Cannot execute code or modify the schedule

### Retry detection
The supervisor is the graph's entry point on both initial run and retries.
It detects a retry by checking:

```python
is_retry = bool(state["adjudication"]) and not state["adjudication"].get("approved", True)
```

On retry it:
1. Increments `state["retry_count"]`
2. Calls `governor.increment_retry(workflow_id)` — if this raises `BudgetExceededError`,
   the error is appended to `state["errors"]` and the node returns early (graph routes to `failed`)

### Deterministic mode
Snapshots state after each run via `replay.snapshot()`.

---

## 2. CodeAgent

**File:** `execution_plane/code_agent.py`
**Model role:** `execution` (fastest/cheapest model)
**Capability required:** `execute_code`

### Responsibilities
- Read `state["plan"]` and `tool_outputs["task"]`
- Generate Python code and write it to `state["code_generated"]`
- Cannot call models directly
- Cannot write to memory

### Silent skip behaviour
If `execute_code` is not permitted in the active capability profile, CodeAgent
silently sets `state["code_generated"] = ""` and returns without error.
This is intentional — `simple` profile workflows skip code generation entirely.

```python
try:
    firewall.check("execute_code", state["capability_profile"])
except CapabilityViolationError:
    new_state["code_generated"] = ""
    return new_state   # no error recorded, graph continues to judge
```

### Tool loop mode (Phase 35)
When `code_agent_tool_loop` is provided to `build_code_agent_node()`, CodeAgent
delegates to `CodeAgentToolLoop.run()` instead of single-shot generation. The tool
loop gives the code agent iterative access to `read_file`, `grep`, `run_snippet`,
and a terminal `submit_code` tool before producing code.

Controlled by `code_agent_strategy` in `config/models.yaml`:
- `"single_shot"` (default) — existing behaviour, no tool loop
- `"tool_loop"` — iterative exploration before code generation

When active:
- Tool steps stored in `state["tool_outputs"]["code_agent_tool_steps"]`
- Auto-read: in patch mode (`edit_format="patch"`), write targets are auto-read first
- `CostGovernor.check_limits()` called between each iteration
- On mid-loop exception: partial steps preserved, `generation_failed=True` set
- `submit_code` is terminal — no `write_file` tool (all writes go through file_writer pipeline)
- **ToolSelector integration**: optional `tool_selector` param filters `_TOOL_SCHEMAS` via `_get_tool_schemas(task, profile)` before the first native-mode generate_messages call. Passes `step="code_agent_node"`. Falls back to full schema list when selector returns empty.

Independent from Phase 32's supervisor-level exploration (`exploration_strategy`).

### Deterministic mode
Snapshots state after each run.

---

## 3. JudgeAgent

**File:** `execution_plane/judge_agent.py`
**Model role:** `evaluation` (mid-tier model)
**Capability required:** `read_memory`

### Responsibilities
- Evaluate `state["plan"]` and `state["code_generated"]`
- Return a structured JSON adjudication object
- Write result to `state["adjudication"]` (always includes `"approved": bool`)
- No retry logic inside the node — retry decisions belong to the graph router

### Module-level helpers (importable directly)

```python
from execution_plane.judge_agent import parse_adjudication, is_approved
```

**`parse_adjudication(raw: str) -> dict`**
Parses the model's raw text response as JSON. Raises `AdjudicationFailure` if:
- Response is not valid JSON
- Any required field is missing
- `risk_classification` is not one of `"low"`, `"medium"`, `"high"`

**`is_approved(adjudication: dict) -> bool`**
Applies the hard approval rules:
- `claim_valid` must be `True`
- `evidence_strength` must be `>= 4`
- `risk_classification` must not be `"high"`
All three must hold. No partial credit.

### Required output schema

```json
{
  "claim_valid": true | false,
  "evidence_strength": 1–10,
  "counterarguments": ["..."],
  "risk_classification": "low" | "medium" | "high",
  "explanation": "..."
}
```

### Error recovery
If `parse_adjudication()` raises `AdjudicationFailure`, the node catches it and:
- Sets `adjudication = {"approved": False, "parse_error": "..."}`
- Appends the error string to `state["errors"]`
- Does NOT propagate the exception — the graph continues and routes to `retry` or `failed`

### Deterministic mode
Snapshots state after each run.

---

## 4. ToolAgent

**File:** `execution_plane/tool_agent.py`
**Model role:** `execution` (same role as CodeAgent)
**Capability required:** determined per-tool via `tool_profiles` in `capabilities.yaml`

### Responsibilities
- Parse tool calls from model output and dispatch through `ToolRegistry`
- Inject tool results back into model context for the next round
- Run up to `max_tool_rounds` (default 3) iterations; stop when no tool calls appear
- Store all results in `state["tool_outputs"]["tool_calls"]`

### Tool selection (Phase 37a + Phase 44)
When `tool_selector: ToolSelector` is passed to `ToolAgent.__init__`:
- `selected = tool_selector.select(state["task"], state["capability_profile"], step="tool_agent_node")`
- `tool_schemas = adapter.get_tool_schemas_for(selected)` (pre-filtered, no redundant capability check)
- `tool_outputs["tool_selection"] = tool_selector.get_selection_stats()` recorded after selection (includes `"step"` key)
- When `tool_selector is None`: existing full-list behavior preserved (`adapter.get_tool_schemas(profile)`)

### Two execution paths

**Text path (Phase 8 — default, `native_adapter=None`)**
- Calls `router.generate()` with accumulated text context
- Parses `<tool_call>{...}</tool_call>` regex blocks from response text
- `TOOL_CALL_RE` lives in `control_plane/native_tool_adapter.py`

**Native adapter path (Phase 9 — `native_adapter=NativeToolAdapter`)**
- Calls `router.generate_messages(messages=..., tools=adapter.get_tool_schemas(profile))`
- `adapter.parse_tool_calls(result)` — native structured data only; text-based `<tool_call>`
  parsing is **never** used when the native adapter is present (Security Batch 1, S2 fix).
  If `parse_tool_calls()` returns `[]`, the loop ends — no fallback to regex.
- When a round produces >1 calls: parallel dispatch via `ThreadPoolExecutor`
- Single call: serial path (no thread overhead)
- Results collected in call-iterator order (deterministic, not `as_completed` order)

### Cache integration (Phase 10)
When `cache: ToolResultCache` is passed to `ToolAgent.__init__`, every tool call goes through
`_execute_one()`:
1. Check `cache.get(name, params)` — on hit, return cached result immediately (no registry call)
2. If audit_logger provided, record `tool_cache_hit` event on every cache hit
3. On miss, call `registry.execute()` as normal
4. On `result.success=True`, put result into cache using `tool_def.cache_ttl_seconds` (0 → not cached)

`_dispatch_serial` and `_dispatch_parallel` both delegate to `_execute_one`.

### Prompt injection prevention (Security Batch 1, S2)
Before building the tool-call prompt, `state["plan"]` and `state["code_generated"]` are
sanitized via `_sanitize_prompt_content()` which strips any `<tool_call>...</tool_call>`
blocks. This prevents user-controlled content from injecting fake tool calls into the prompt.

### Fast-path skip
If `registry.list_allowed(state["capability_profile"])` returns `[]`, the node returns
state unchanged immediately — no model call, no loop. This keeps the graph topology
simple without conditional branches.

### Tool call format (backend-agnostic text protocol — text path)

```
<tool_call>{"name": "memory_read", "params": {"namespace": "project", "key": "req"}}</tool_call>
```

Result injected as:

```
<tool_result name="memory_read">{"success": true, "output": "..."}</tool_result>
```

### Error handling
- **Malformed JSON** in `<tool_call>`: log warning, skip that call, continue loop.
- **ToolCallError** (unknown tool or capability denied): append
  `"tool_call_error: <name> — <reason>"` to `state["errors"]`, skip, continue.
- **ToolResult(success=False)**: append `"tool_error: <name> — <error>"` to `state["errors"]`,
  store result (preserves observability), continue.
- **max_tool_rounds reached**: normal exit, no error.

### Position in graph
`tool_agent` runs between `code_agent` and `judge`. `build_graph()` accepts optional
`registry: ToolRegistry | None = None`, `cache: ToolResultCache | None = None`,
`audit_logger: AuditLogger | None = None`. All default to `None` (backward compatible).

---

## 5. Control Plane (Non-Agent Components)

These components are deterministic and rule-based. They contain no reasoning logic.

| Class | File | Error type |
|-------|------|------------|
| `AuditLogger` | `audit_logger.py` | none (no-op when `store=None`) |
| `CapabilityFirewall` | `capability_registry.py` | `CapabilityViolationError` (subclass of `PermissionError`) |
| `ConversationBuffer` | `message_history.py` | `ValueError` (invalid role) |
| `CostGovernor` | `cost_governor.py` | `BudgetExceededError` (subclass of `RuntimeError`) |
| `HttpToolHandler` | `http_tool_handler.py` | none (all failures → `ToolResult(success=False)`) |
| `MetricsCollector` | `metrics_collector.py` | none |
| `ModelRouter` | `model_router.py` | `ValueError` (bad role/backend), `BudgetExceededError` (via governor) |
| `NativeToolAdapter` | `native_tool_adapter.py` | none (malformed JSON logged + skipped) |
| `RateLimiter` | `rate_limiter.py` | `RateLimitError` (subclass of `Exception`) |
| `ReplayEngine` | `replay_engine.py` | `FileNotFoundError` (on load miss) |
| `SchedulerCore` | `scheduler_core.py` | `SchedulerViolationError` (subclass of `ValueError`) |
| `ToolRegistry` | `tool_registry.py` | `ToolCallError` on unknown tool or capability denied; `ValueError` on invalid custom tool config |
| `ToolResultCache` | `tool_cache.py` | none |
| `WebhookDispatcher` | `webhook_dispatcher.py` | `ValueError` (non-HTTP URL, raised synchronously) |
| `Linter` | `linter.py` | `LinterError` (subprocess failure) |
| `SymbolExtractor` | `symbol_extractor.py` | none (returns `None` on parse failure) |
| `PathValidator` | `path_validator.py` | `PathTraversalError` (subclass of `ValueError`) |
| `ToolDispatcher` | `tool_dispatcher.py` | none (all errors embedded in observation strings) |
| `ExplorationLoop` | `exploration_loop.py` | none (budget errors caught, capability denials short-circuit) |
| `CodeAgentToolLoop` | `code_agent_tool_loop.py` | none (budget errors caught, partial steps preserved on exception) |
| `ToolSelector` | `tool_selector.py` | none |
| `LazyMCPToolHandler` | `mcp_tool_handler.py` | none (connection errors returned as error dict) |
| `KnowledgeStore` | `mcp_servers/codebase_knowledge/knowledge.py` | none |
| `CodebaseKnowledgeServer` | `mcp_servers/codebase_knowledge/server.py` | none |
| `HealthDataProvider` | `mcp_servers/orchestrator_health/health.py` | none (all methods return `{"error": str(e)}` on failure) |
| `OrchestratorHealthMCP` | `mcp_servers/orchestrator_health/server.py` | none |
| `MemoryStore` | `memory/memory_store.py` | `RuntimeError` (file I/O), `ValueError` (path traversal in key/namespace) |
| `TestOutputParser` | `control_plane/test_output_parser.py` | none (never raises — always returns StructuredTestResult) |

### TestOutputParser (Phase 39)
- Parses pytest stdout into per-test `TestFailure` records with `test_name`, `test_file`, `line_number`, `error_type`, `expected`, `actual`, `category`
- `parse(raw_output, returncode, timed_out)` — never raises; auto-detects tb format (`short`/`long`/`unknown`); deduplicates FAILED lines that appear in both details and summary sections
- `format_for_llm(result)` — `FAILURE N/M: file::test (line N) [category]` digest for reflector prompt
- Failure categories: `assertion`, `error`, `fixture`, `collection`; fixture/collection errors separated into their own lists
- `_sanitize_for_prompt(text, max_len)` — strips control chars, escapes `{`/`}` template braces, truncates
- Wired into `TestRunner` when `structured_parsing: true` in `config/test_runner.yaml`; adds `structured_failures`/`failure_summary`/`parse_ok`/`tb_format` to run result dict
- `code_reflector.py` uses `failure_summary` (structured path) or falls back to raw output; `fixes_applied` from LLM response stored in `tool_outputs` for observability
- `ui/stream_adapter.py` emits `EVT_TEST` with `failure_summary` payload from `test_runner` node

### ToolSelector (Phase 37a + Phase 44)
- Task-aware tool filtering — selects relevant tools instead of injecting all schemas into every LLM call
- Composite scoring: `keyword(0.25) + tag(0.25) + category(0.15) + usage(0.15) + step_affinity(0.2)`
- `select(task, profile, max_tools, step="")` — returns filtered `list[ToolDefinition]` (capability-gated first via `registry.list_allowed`)
- `select_with_deps(task, profile, max_tools, step="")` — like select() but pulls dependent tools from `tool_dependencies` config
- `get_selection_stats()` — returns stats dict from last select() call (counts, scores, fallback flag, step, active_categories)
- Step affinity (Phase 44): `_step_affinity_score(tool_name, step)` — config matrix lookup per graph node
  - Empty step → 0.0 (backward compat); absent step → neutral 0.3; empty map (e.g. judge_node) → 0.0 (suppresses tools)
  - Config: `step_affinity` section in `config/tool_selector.yaml` with 6 step entries
- Anchor boost: tools explicitly named in task text always included regardless of score
- Confidence fallback: when max score < `confidence_threshold`, returns category defaults (not all tools)
- Thread-safe: last-write-wins for stats (no shared mutable state between concurrent calls)
- Config: `config/tool_selector.yaml` — weights, thresholds, categories, dependency map, step_affinity matrix
- No `execution_plane` imports (control_plane module)

### LazyMCPToolHandler (Phase 37a)
- Callable handler that defers MCP server connection until first tool invocation
- `__call__(**params)` — triggers `server_registry._ensure_connected()`, then delegates to real `MCPToolHandler`
- `_ensure_connected()` uses per-server `threading.Lock` to prevent duplicate subprocess launches
- After connection: LazyMCPToolHandler instances replaced with real MCPToolHandler in ToolRegistry
- Registered via `MCPServerRegistry._register_lazy()` when config has `lazy: true`
- `load_from_config()` supports: `lazy`, `tags`, `per_tool_tags`, `tool_cache` fields

### HealthDataProvider (orchestrator-health-mcp)
- Standalone MCP server package at `mcp_servers/orchestrator_health/` — 12 tools
- `HealthConfig` dataclass (no Pydantic) defined inside `health.py` — loaded by `__main__.py` via yaml directly
- `OrchestratorHealthConfig` (Pydantic, `extra="ignore"`) lives in `control_plane/config_models.py` for the config system; `load_orchestrator_health_config()` in `control_plane/config_loader.py`
- **Boundary**: same as codebase_knowledge — `mcp_servers/` cannot import `control_plane` or `execution_plane` (AST-level, includes local imports). Workarounds: direct `sqlite3` for ledger reads, inline quality score formulas, `memory.MemoryStore` for tracker data, subprocess for `run_workflow`.
- 12 tools: `query_outcomes`, `get_outcome_stats`, `get_model_quality`, `get_tool_effectiveness`, `get_system_health`, `query_memory`, `list_memory_namespaces`, `get_config`, `validate_configs`, `query_improvements`, `run_tests`, `run_workflow`
- Quality scores computed inline: model quality = 0.6 × approval_rate + 0.4 × test_pass_rate; tool effectiveness = success_rate with boost 0.5/1.0/1.2 at <0.3/<0.8/≥0.8 thresholds
- `run_workflow` calls `cli.py run` via subprocess (disabled by default, `run_workflow_enabled: false`)
- Registered in `config/mcp_servers.yaml` with `auto_connect: true`, `lazy: false`

### KnowledgeStore (Phase 37b)
- Structured knowledge storage with TF-IDF search, backed by MemoryStore
- 3 namespaces: `kb_decisions`, `kb_patterns`, `kb_conventions`
- `store_decision(title, rationale, component, tags)` / `query_decisions(query, limit)` — decision management
- `store_pattern(name, description, example, tags)` / `query_patterns(query, limit)` — pattern management
- `get_conventions()` / `update_conventions(description)` — conventions management
- Search: TF-IDF scoring + tag bonus (+0.3 per matching tag) + recency bonus (+0.1 * freshness)
- `CodebaseKnowledgeServer` wraps KnowledgeStore as MCP server (JSON-RPC 2.0 over stdio, protocol 2024-11-05)
- 6 MCP tools: store_decision, query_decisions, store_pattern, query_patterns, get_conventions, update_conventions
- Standalone entry point: `python -m mcp_servers.codebase_knowledge [--store path]`
- Import boundary: `mcp_servers/` may import `memory/` but NOT `control_plane/` or `execution_plane/`

### CapabilityFirewall
- Reads profiles from `config/capabilities.yaml` at init
- `check(capability, profile)` → silent success or raises `CapabilityViolationError`
- Unknown profiles have no allowed capabilities (deny-by-default)

### CostGovernor
- Must call `register(workflow_id, mode)` before any other method on a workflow
- Tracks per-workflow: `tokens_spent`, `retry_count`, `start_time`, `limits` (from config)
- `mode="deterministic"` loads stricter limits (`max_retries=0`)
- `get_max_retries(workflow_id)` is used by the graph router to decide retry vs fail
- `deregister(workflow_id)` removes state entry; idempotent (no error if already removed)
- **R1 pattern (Security Batch 1):** All `graph.invoke()` sites are wrapped in `try/finally`
  with `governor.deregister(workflow_id)` to prevent memory leaks on crash

### ModelRouter
- `generate(workflow_id, role, prompt, max_tokens=2048, mode="default", step=None) -> str`
  Wraps prompt as a single user message and delegates to `generate_messages()`. Legacy callers unchanged.
- `generate_messages(workflow_id, role, messages, max_tokens=2048, mode="default", tools=None, step=None) -> GenerationResult`
  Primary interface for multi-turn, tool-enabled generation. Returns `GenerationResult(text, tokens, tool_calls)`.
  `tool_calls` is `None` if tools not used; `[]` if tools were offered but none called; list of dicts otherwise.
- `stream_generate(workflow_id, role, prompt, max_tokens=2048, mode="default", step=None)` — async generator
- `get_context_limit(role, step=None) -> int | None` — resolves through step override if provided
- `GenerationResult` dataclass: `text: str`, `tokens: int`, `tool_calls: list[dict] | None`
- `mode="deterministic"` applies `deterministic_params` from `models.yaml` (temperature=0, etc.)
- Backend selected from `config/models.yaml`. Switching backend = config change only, no code change.
- Optional `metrics: MetricsCollector` param enables adaptive fallback routing:
  when `routing_strategy: adaptive` in config and primary error rate >= threshold,
  calls are routed to `fallback_backend`. Without `metrics` the behaviour is unchanged.
- Records call outcome (latency, success, tokens) in MetricsCollector after every call.
- **Phase 40 — Per-step model routing**: `KNOWN_STEPS` frozenset enumerates all graph node names.
  `step_overrides` in `config/models.yaml` maps node names to role/backend/max_tokens overrides.
  `resolve_step(role, step)` returns `(effective_role, backend_override, max_tokens_override)`.
  Strict validation at init (`strict_step_validation: true`): raises `ValueError` on unknown role/backend.
  Lenient mode logs warnings and removes invalid entries. All generation methods pass `step` through.

### ConversationBuffer
- Thread-safe (RLock — reentrant, because `add()` calls `save()` while holding the lock)
- Optional MemoryStore persistence: key `sessions/{session_id}/history` in `"sessions"` namespace
- `add(role, content)`: appends message; trims oldest non-system messages when `token_estimate > max_tokens`
- `token_estimate`: sum of all message content lengths // 4 (4 chars/token heuristic)
- `get_messages() -> list[dict]`: returns a copy of the internal list
- `clear(keep_system=True)`: removes all non-system messages (or all if `keep_system=False`)
- `load(session_id, store, max_tokens) -> ConversationBuffer`: classmethod; returns empty buffer if key absent
- `save()`: no-op when `store=None`; valid roles are `"system"`, `"user"`, `"assistant"`

### NativeToolAdapter
- `get_tool_schemas(profile: str) -> list[dict]`: returns unified tool dicts for `generate_messages(tools=...)`
  Schema format: `{"name": str, "description": str, "params_schema": dict}`
- `parse_tool_calls(result: GenerationResult) -> list[ToolCallRequest]`:
  uses `result.tool_calls` (native) when not None, including `[]`; falls back to `TOOL_CALL_RE` regex otherwise
- `format_tool_result_message(name, output, success) -> str`: wraps result in `<tool_result>` XML tag
- `TOOL_CALL_RE`: `<tool_call>(.*?)</tool_call>` regex; defined here, not in `tool_agent.py`
- No `anthropic` or `openai` imports (import boundary enforced)

### AuditLogger
- Append-only FIFO event log backed by `MemoryStore` namespace `"audit_log"`, key `"events"`
- `store=None` makes all methods no-ops — used in tests for isolation without conditional branches
- `record(event_type, *, workflow_id=None, details=None)` — thread-safe; evicts oldest entry when
  `len(events) > max_entries`; returns unique `event_id` string
- `query(*, event_type=None, workflow_id=None, limit=50, before_id=None)` — returns events
  newest-first; `before_id` is an exclusive cursor for pagination
- Wired into `api.py`: `require_auth` records `auth_ok`/`auth_fail`; `require_rate_limit` records
  `rate_limited`; `_run_workflow` records `workflow_complete`/`workflow_failed`
- Config: `config/audit.yaml` (`max_entries`, `enabled`)

### RateLimiter
- Fixed-window per-key counter; keys are arbitrary strings (typically client IPs in `api.py`)
- `check(key)` — increments counter; raises `RateLimitError` when `max_requests` exceeded in window
- `reset(key=None)` — clears one key or all keys (used in tests and admin operations)
- Configured via env vars `RATE_LIMIT_REQUESTS` (default 60) and `RATE_LIMIT_WINDOW` (default 60s)
- `api.py` maintains `_ip_limiter = RateLimiter()` at module level; `require_rate_limit` FastAPI
  Depends wraps it, returning HTTP 429 on `RateLimitError`; wired into all four `/workflows` routes

### WebhookDispatcher
- Fire-and-forget HTTP POST to `callback_url` after workflow completion or failure
- `dispatch(url, payload, workflow_id)` — submits to daemon `ThreadPoolExecutor`; returns immediately;
  raises `ValueError` synchronously for non-HTTP(S) URLs
- `_deliver(url, payload, workflow_id)` — retry loop; attempt 0 has no delay; attempt N waits
  `base_delay * 2^(N-1)` seconds; uses stdlib `urllib.request` only
- Records `callback_sent` (on success) or `callback_failed` (all retries exhausted) in `AuditLogger`
- `POST /workflows/stream` rejects `callback_url` with 422 (SSE is already the push channel)

### ToolResultCache
- Thread-safe in-memory TTL cache; key = SHA-256 of `"{name}:{json.dumps(params, sort_keys=True)}"`
- `put(name, params, result, ttl_seconds)` — no-op when `result.success=False` or `ttl_seconds=0`
- `get(name, params) -> ToolResult | None` — returns `None` on miss or expired entry (lazy eviction)
- `invalidate(name) -> int` — removes all entries for a tool by scanning `_CacheEntry.tool_name`
- `clear()` — removes all entries
- `stats` property — `{"hits": N, "misses": N, "entries": N, "evictions": N}`;
  `entries` counts only live (non-expired) entries
- Must not import `execution_plane` or model SDKs (enforced by AST boundary tests)

### HttpToolHandler
- Dispatches tool calls as HTTP POST `{"name": ..., "params": ...}` to a configured external URL
- `__call__(name, params) -> ToolResult`: wraps the HTTP round-trip; all failures return `ToolResult(success=False)`
- Failure modes covered: `HTTPError`, `URLError`, `TimeoutError`, `JSONDecodeError`, missing `success` key
- `validate_url(url, https_only=True)` static method — raises `ValueError` for non-HTTPS when `https_only`
- Registered in `ToolRegistry` via `handler_type="http"` + `handler_config={"url": ...}`
- Instantiated lazily via local import inside `ToolRegistry.execute()` (avoids circular import)
- Must not import `execution_plane` or model SDKs (enforced by AST boundary tests)

### ToolRegistry (Phase 10 extensions)
- `ToolDefinition` extended with: `cache_ttl_seconds` (int, default 0), `handler_type` (str, default `"function"`),
  `handler_config` (dict|None), `is_custom` (bool), `capability_profiles` (list[str]|None)
- `register_custom(name, description, params_schema, handler_type, handler_config, capability_profiles, cache_ttl_seconds)`
  — validates handler_type and URL; persists to MemoryStore `custom_tools` namespace (key `"custom_tools/{name}"`)
- `remove_custom(name)` — removes from registry and MemoryStore; raises `ToolCallError` if name is a built-in
- `load_custom_tools()` — restores all persisted custom tools from MemoryStore on startup; called in `api.py`
- `get_tool(name) -> ToolDefinition | None` — returns definition or `None` for unknown tools
- `list_allowed(profile)` — union of built-in allowed tools (YAML config) + custom tools whose `capability_profiles`
  includes `profile` (or `capability_profiles is None` = allowed for all profiles)
- `execute()` routes HTTP tools to `HttpToolHandler`; custom tool capability check uses `capability_profiles` field

### Linter (Phase 30)
- Wraps `ruff check --output-format=json` subprocess execution
- `lint(code, filename="check.py") -> LintResult` — writes code to temp file, runs ruff, parses JSON
- `LintResult(violations, raw_output, success)` — success is True even with violations (only False on crash)
- Config: `config/linter.yaml` — `enabled`, `max_violations`, `severity_threshold`

### SymbolExtractor (Phase 31)
- AST-based compact stub generator for Python source files
- `extract(code) -> str | None` — returns stub string or None on syntax error
- Stubs include: class headers, method signatures, function signatures, decorators, module-level constants
- Filtering: dunders always included, private methods excluded by default, name-mangled always excluded
- Truncation: `max_stub_chars` per file, `max_total_stub_chars` across all files
- Config: `config/symbol_extractor.yaml` — `include_private`, `include_docstrings`, `include_imports`, char limits

### PathValidator (Phase 32)
- Pure function: `safe_resolve(base_root, requested) -> Path`
- Raises `PathTraversalError` when resolved path escapes `base_root`
- Used by both `ToolDispatcher` and `FileContextReader` for path security

### ToolDispatcher (Phase 32)
- Executes named exploration tools: `read_file`, `grep`, `run_snippet`
- `dispatch(tool_name, params, profile) -> str` — never raises; all errors embedded with `"error:"` prefix
- Capability check per tool: `read_file`/`grep` require `filesystem_access`, `run_snippet` requires `execute_code`
- `SandboxCallable` protocol for optional sandbox injection (default: `None` → run_snippet returns error)
- Config: `config/exploration.yaml` — char limits, max results

### ExplorationLoop (Phase 32)
- Drives multi-turn exploration sessions before supervisor planning
- Two modes: native tool calls (`supports_tool_use: true`) and ReAct text format (`supports_tool_use: false`)
- `run(workflow_id, profile, task, mode) -> (context_str, steps_list)`
- Deterministic mode: returns `("", [])` immediately
- `BudgetExceededError` caught → `_budget` pseudo-step recorded → planning proceeds
- Capability denial short-circuits the loop (no wasted token on futile calls)
- `max_exploration_steps` bounds both loop modes
- Known strategies: `none`, `supervisor_tools`, `agent_tools` (Phase 34), `multi_candidate` (Phase 35)
- **ToolSelector integration** (Code Quality Pass): optional `tool_selector` param; `_get_tool_schemas(task, profile)` filters `_TOOL_SCHEMAS` via `select(task, profile, step="exploration_loop")`. Only applies in native mode; ReAct mode is text-only and unaffected. Falls back to full schema list if selector returns empty.

### CodeAgentToolLoop (Phase 35)
- Iterative tool loop for code agent — explore then generate code
- Tools: `read_file`, `grep`, `run_snippet` (read-only) + `submit_code` (terminal, exits loop)
- No `write_file` tool — all writes go through existing file_writer pipeline
- Two modes: native tool calls (`supports_tool_use: true`) and ReAct text format
- `run(workflow_id, profile, task, plan, file_context, edit_format, write_targets) -> (code, steps)`
- `auto_read_target: true` + `edit_format: "patch"`: target files auto-read as first step
- `CostGovernor.check_limits()` called between each iteration
- `max_tool_iterations` bounds both loop modes (default: 10)
- On `BudgetExceededError`: returns empty code with `_budget` step
- On mid-loop exception: returns empty code with partial steps preserved
- Config: `config/code_agent_tools.yaml` — `max_tool_iterations`, `auto_read_target`
- Activated by `code_agent_strategy: "tool_loop"` in `config/models.yaml`
- Independent of `exploration_strategy` (Phase 32) — both can be active simultaneously
- Import boundary: lives in `control_plane/`; no execution_plane imports

---

## 6. TeamCoordinator

**File:** `execution_plane/team_coordinator.py`
**Not a LangGraph node** — invoked directly from CLI/API team mode, not wired into the graph.

### Responsibilities
- Accept a list of subtask strings and a parent `workflow_id`
- Run each subtask as a full independent workflow (supervisor → code_agent → judge)
  via `concurrent.futures.ThreadPoolExecutor`
- Return a `list[TeamResult]` in the same order as the input subtasks
- Isolate per-subtask exceptions — one failure does not abort other subtasks

### TeamResult fields
```python
subtask: str           # original subtask description
workflow_id: str       # "{parent_workflow_id}-sub-{index}"
plan: str
code_generated: str
adjudication: dict
errors: list[str]
success: bool          # True iff adjudication["approved"] is True
```

### Constraints
- `max_workers` is capped at `min(max_workers, len(subtasks))` at runtime
- Empty subtasks list returns `[]` immediately — no threads spawned
- Incompatible with `mode="deterministic"` and `profile="simple"` (callers enforce this)
- Each sub-workflow calls `governor.register(sub_id)` on the shared governor; `deregister()` in `finally` block (R1 fix)

### Team mode sequence (CLI and API)
1. Decompose: call `router.generate("reasoning", decompose_prompt)` → parse numbered list
2. Run: `TeamCoordinator.run(subtasks, parent_id, mode, profile)`
3. If all subtasks fail → exit 1 / store failed
4. Synthesize: call `router.generate("reasoning", synthesis_prompt)` with successful subtask plans
5. Judge: call `router.generate("evaluation", judge_prompt)` → `parse_adjudication` / `is_approved`
6. Print/store summary with per-subtask success flags and final verdict

---

## 7. Interaction Rules

### Execution flow

```
supervisor → file_context → code_agent → lint_node
                                            ├─ "clean" → sandbox_executor → code_reflector
                                            └─ "violations" → code_reflector
                                                                 ├─ "revise" → sandbox_executor
                                                                 └─ "done" → file_writer
                                                                                ├─ "ok" → test_runner
                                                                                └─ "patch_fail" → code_reflector
                                                                              test_runner
                                                                                ├─ "pass" → tool_agent → judge
                                                                                └─ "fail" → code_reflector
judge → route_after_judge()
  ↓ approved → END
  ↓ retry    → supervisor  (retry_count incremented)
  ↓ failed   → failed_node → END
```

When `exploration_strategy == "supervisor_tools"`, supervisor runs an ExplorationLoop
before generating its plan. Exploration context is injected via `{exploration_section}` in the prompt.

When `code_agent_strategy == "tool_loop"`, code_agent runs a CodeAgentToolLoop
before producing code. The loop uses read-only tools (read_file, grep, run_snippet)
and exits when the LLM calls submit_code. Steps are stored in
`state["tool_outputs"]["code_agent_tool_steps"]`.

### Routing logic (in `graph_builder.py`)

1. If `adjudication["approved"]` → `approved`
2. Else if mode is `"deterministic"` → `failed` (no retries ever)
3. Else if any error contains `"budget_exceeded"` → `failed`
4. Else if `retry_count < governor.get_max_retries()` → `retry`
5. Else → `failed`

### MemoryStore (Security Batch 1, S3)
- JSON-backed key-value store with namespace/key hierarchy
- `_validate_key(namespace, key)` rejects values containing `..`, `\`, or null bytes
- Called at the top of `write()`, `read()`, `delete()`, `read_slice()`
- Raises `ValueError` on violation — defense-in-depth against namespace pollution

### tool_output_keys (Security Batch 1, A1)
- `execution_plane/tool_output_keys.py` defines 25+ string constants for `state["tool_outputs"]` keys
- Grouped by owning node: Supervisor, Code Agent, File Writer, Code Reflector, Lint Node, Sandbox Executor, Test Runner, Tool Agent, File Context
- Reference module — no behavioral change yet; future phases will replace string literals with constant imports

### CodeSandbox (Quick Win QW-4)
- `_MAX_CAPTURE_BYTES = 1_048_576` (1MB) — caps both stdout and stderr capture
- `subprocess.run()` uses `capture_output=True` without `text=True` (bytes mode); output
  sliced to `_MAX_CAPTURE_BYTES` before `decode("utf-8", errors="replace")`
- Result dict gains `"truncated": bool` field — True when output exceeded cap
- `StreamingSandbox` also enforces the cap: stdout reader thread breaks on threshold,
  stderr reader uses `proc.stderr.read(_MAX_CAPTURE_BYTES)`
- Prevents OOM on programs that write large volumes to stdout/stderr

### Code Reflector Test Failure Highlights (Quick Win QW-1)
- `_extract_failure_highlights(raw_output, max_chars=2000) -> str` extracts actionable lines:
  - `E ` prefix lines (pytest assertion introspection)
  - Lines containing `FAILED` (summary)
  - Lines containing `ERROR` (collection errors)
  - Lines matching `file.py:NN: in func` (location)
- When highlights are found, test_section uses `"Failure details:\n{highlights}"` format
  instead of raw `"- output: {raw_output}"` — eliminates noise (dots, timing, collection counts)
- Falls back to raw output when no highlights found (e.g., all-pass runs)
- Both single-file (`_PROMPT`) and multi-file (`_MULTI_FILE_REFLECT_PROMPT`) paths use highlights
- Max 2000 chars of highlights to prevent oversized prompts

### Hard rules
- No lateral agent calls (agents do not call each other directly)
- No autonomous graph mutation
- All model calls go through `ModelRouter.generate()` or `ModelRouter.generate_messages()` — no direct SDK calls in agents
- All capability checks go through `CapabilityFirewall.check()` before the action
- All errors are appended to `state["errors"]`; nothing is swallowed silently
  (except the silent skip in CodeAgent when `execute_code` is not permitted — that is by design)
- `NativeToolAdapter` must not import `anthropic` or `openai` — SDK format conversion belongs in `ModelRouter`
- `control_plane` modules must not import `execution_plane` (enforced by AST boundary tests)
- `tool_cache.py` and `http_tool_handler.py` must not import `execution_plane` or model SDKs (enforced by AST boundary tests)
- `mcp_servers/` modules must not import `control_plane` or `execution_plane` (AST-level, includes local imports inside functions — enforced by AST boundary tests)
