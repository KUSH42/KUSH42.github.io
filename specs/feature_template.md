# <Spec Name>

Status: Draft
Priority: P0 / P1 / P2
Depends on: <spec-name or Phase N (component names)>
Goal: <One sentence — what this spec achieves and why it matters.>

---

## Problem

Why this spec exists. Describe the concrete gaps, limitations, or failures in the current system that motivate this work. Use evidence: tables, metrics, code snippets, failure scenarios. Not "it would be nice to have X" but "X is broken/missing and here's the impact."

---

## Goals

Numbered list of concrete outcomes. Each goal should be testable — you can verify whether it was achieved.

1. **G1**: ...
2. **G2**: ...

---

## Non-Goals

Explicit exclusions. What this spec deliberately does NOT do, and why. Prevents scope creep and sets expectations.

- **Not X** — reason deferred or out of scope.

---

## Design

The bulk of the spec. Include:

- **Architecture** — ASCII diagrams, component relationships, data flow
- **Data models** — dataclasses, TypedDicts, schemas with field descriptions
- **Key algorithms** — pseudocode or real Python for non-obvious logic
- **Interface contracts** — class/method signatures for new or modified components
- **Integration points** — how this connects to existing components
- **Tool definitions** — if adding LLM-callable tools, include full JSON schema

Use subsections (`### 1. Component Name`) to organize.

---

## Design Decisions

Key choices and their rationale. Format: "We chose X over Y because Z."
Include alternatives that were considered and why they were rejected.

---

## Configuration

Full YAML config file with comments. Include the file path.

```yaml
# config/<spec_name>.yaml
spec_name:
  enabled: false          # Opt-in by default
  # ... all fields with defaults and comments
```

---

## Files Changed

List of source files created or modified, grouped by type.

### New files
- `control_plane/<component>.py` — <purpose>

### Modified files
- `control_plane/config_loader.py` — load new config
- `control_plane/config_models.py` — add config dataclass
- `execution_plane/state.py` — add state fields (if any)
- `control_plane/state_validator.py` — register new fields

---

## Implementation Plan

Numbered steps. Step 0 is always config scaffolding when a new YAML is introduced. Each step includes a test estimate.

### Step 0: Config scaffolding
- Create config file, add config model, load in config_loader
- ~N tests

### Step 1: <Core component>
- What to build, key behaviors
- ~N tests

### Step 2: <Integration>
- How it connects to the graph/workflow
- ~N tests

---

## State Changes

Which `OrchestratorState` fields are added, read, or modified?

| Field | Type | Purpose |
|---|---|---|
| `new_field` | `type` | description |

New fields must be added to `REQUIRED_FIELDS` in `state_validator.py` with backward-compatible defaults.

If no state changes: "No new OrchestratorState fields."

---

## Capabilities Required

Which capability profile gates apply?

- `execute_code` — needed for X
- Or: "No new capabilities required."

---

## Cost Impact

- **Token overhead**: per-invocation and per-workflow estimates
- **Frequency**: how often this activates
- **Net effect**: does this save or cost tokens overall?

---

## Error Conditions

| Condition | Handling |
|---|---|
| <failure scenario> | <what the system does> |

---

## Determinism Impact

Does this affect deterministic mode? If yes, describe constraints (disabled, temperature forced to 0, etc.).

---

## Backward Compatibility

How existing behavior is preserved. What happens when this feature is disabled (the default)? Are there migration steps?

---

## Test Plan

| Step | Tests | Focus |
|---|---|---|
| 0 | ~N | Config loading, defaults |
| 1 | ~N | Core component behavior |
| **Total** | **~N** | |

Integration tests:
- <scenario 1>
- <scenario 2>

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| <what could go wrong> | Low/Med/High | Low/Med/High | <how to prevent or recover> |

---

## Interaction with Other Specs

How this spec relates to past and future work. Which specs feed into this one, and which specs build on it?
