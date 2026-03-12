"""MemoryStore — persistent key-value store backed by a single JSON file.

Namespaces are arbitrary strings. "global" is the convention for shared memory.
Writes are atomic (write to temp file, rename). Single-process use only.
"""

import json
import logging
import os
import re
import tempfile
import threading
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)

_UNSAFE_PATTERNS = re.compile(r"\.\.|\\|\x00")


class MemoryStore:
    """Persistent key-value store backed by a single JSON file.

    Args:
        store_path: Path to the JSON store file. Created if it does not exist.

    Raises:
        RuntimeError: If the file exists but cannot be read (permissions, etc.).
    """

    def __init__(self, store_path: str = "memory/store.json"):
        self._path = Path(store_path)
        self._data: dict[str, dict[str, Any]] = {}
        self._lock = threading.RLock()
        self._load()

    def _load(self) -> None:
        if not self._path.exists():
            return

        try:
            with open(self._path) as f:
                raw = f.read()
        except OSError as e:
            raise RuntimeError(f"memory_store: cannot read store at {self._path}: {e}") from e

        try:
            parsed = json.loads(raw)
            if not isinstance(parsed, dict):
                raise ValueError("top-level value is not a dict")
            self._data = parsed
        except (json.JSONDecodeError, ValueError) as e:
            logger.warning("memory_store: corrupt store at %s — starting empty (%s)", self._path, e)
            self._data = {}

    @staticmethod
    def _validate_key(namespace: str, key: str | None = None) -> None:
        """Reject namespace/key values containing path traversal patterns.

        Raises:
            ValueError: If namespace or key contains '..', backslash, or null bytes.
        """
        for label, value in [("namespace", namespace)] + ([("key", key)] if key is not None else []):
            if _UNSAFE_PATTERNS.search(value):
                raise ValueError(
                    f"memory_store: invalid {label} '{value}' — "
                    "must not contain '..', backslash, or null bytes"
                )

    def _flush(self) -> None:
        self._path.parent.mkdir(parents=True, exist_ok=True)
        try:
            fd, tmp = tempfile.mkstemp(dir=self._path.parent, suffix=".tmp")
            try:
                with os.fdopen(fd, "w") as f:
                    json.dump(self._data, f, indent=2)
            except Exception:
                os.unlink(tmp)
                raise
            os.replace(tmp, self._path)
        except OSError as e:
            raise RuntimeError(f"memory_store: write failed for {self._path}: {e}") from e

    def write(self, namespace: str, key: str, value: Any) -> None:
        """Write a value. Creates the namespace if it does not exist.

        Args:
            namespace: Namespace string (e.g. "global").
            key: Key within the namespace.
            value: JSON-serialisable value.
        """
        self._validate_key(namespace, key)
        with self._lock:
            if namespace not in self._data:
                self._data[namespace] = {}
            self._data[namespace][key] = value
            self._flush()

    def read(self, namespace: str, key: str, default: Any = None) -> Any:
        """Read a value.

        Args:
            namespace: Namespace string.
            key: Key within the namespace.
            default: Returned when namespace or key is absent.

        Returns:
            The stored value, or default.
        """
        self._validate_key(namespace, key)
        with self._lock:
            return self._data.get(namespace, {}).get(key, default)

    def read_slice(self, namespace: str) -> dict:
        """Return all key-value pairs for a namespace.

        Returns:
            Dict of all entries in the namespace. Empty dict if namespace absent.
        """
        self._validate_key(namespace)
        with self._lock:
            return dict(self._data.get(namespace, {}))

    def delete(self, namespace: str, key: str) -> None:
        """Remove a key from a namespace. No-op if the key or namespace is absent.

        Args:
            namespace: Namespace string.
            key: Key to remove.
        """
        self._validate_key(namespace, key)
        with self._lock:
            if namespace in self._data and key in self._data[namespace]:
                del self._data[namespace][key]
                self._flush()

    def append(self, namespace: str, key: str, value: Any, max_items: int | None = None) -> None:
        """Atomically append *value* to a list stored at (namespace, key).

        S10: read-append-write in a single method so callers don't need to
        implement their own read-modify-write cycle.  Creates a new list if
        the key doesn't exist.

        Args:
            namespace: Namespace string.
            key:       Key within the namespace.
            value:     JSON-serialisable value to append.
            max_items: If set, prune the list to at most this many items
                       (keeping the most recent / tail).
        """
        self._validate_key(namespace, key)
        with self._lock:
            if namespace not in self._data:
                self._data[namespace] = {}
            existing = self._data[namespace].get(key)
            if not isinstance(existing, list):
                existing = []
            existing.append(value)
            if max_items is not None and len(existing) > max_items:
                existing = existing[-max_items:]
            self._data[namespace][key] = existing
            self._flush()

    def list_namespaces(self) -> list[str]:
        """Return all namespace names.

        Returns:
            Sorted list of namespace strings.
        """
        with self._lock:
            return sorted(self._data.keys())
