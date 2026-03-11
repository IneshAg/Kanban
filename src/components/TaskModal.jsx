import { PRIORITY_COLOR } from "../constants";

export default function TaskModal({
  editTask,
  form,
  setForm,
  onSave,
  onClose,
  theme,
}) {
  const { surface, border, bg, text, muted } = theme;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: 20,
      }}
    >
      <div
        style={{
          background: surface,
          borderRadius: 14,
          padding: 28,
          width: "100%",
          maxWidth: 420,
          border: `1px solid ${border}`,
        }}
      >
        <h2 style={{ marginBottom: 20, fontSize: 18, fontWeight: 700 }}>
          {editTask ? "Edit Task" : "New Task"}
        </h2>

        <label
          style={{
            fontSize: 12,
            color: muted,
            display: "block",
            marginBottom: 5,
          }}
        >
          TITLE *
        </label>
        <input
          autoFocus
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="What needs to be done?"
          style={{
            width: "100%",
            padding: "9px 12px",
            borderRadius: 8,
            border: `1px solid ${border}`,
            background: bg,
            color: text,
            fontSize: 14,
            marginBottom: 16,
            boxSizing: "border-box",
          }}
        />

        <label
          style={{
            fontSize: 12,
            color: muted,
            display: "block",
            marginBottom: 5,
          }}
        >
          DESCRIPTION
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Optional details…"
          rows={3}
          style={{
            width: "100%",
            padding: "9px 12px",
            borderRadius: 8,
            border: `1px solid ${border}`,
            background: bg,
            color: text,
            fontSize: 14,
            resize: "vertical",
            marginBottom: 16,
            boxSizing: "border-box",
          }}
        />

        <label
          style={{
            fontSize: 12,
            color: muted,
            display: "block",
            marginBottom: 8,
          }}
        >
          PRIORITY
        </label>
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["low", "medium", "high"].map((p) => (
            <button
              key={p}
              onClick={() => setForm({ ...form, priority: p })}
              style={{
                flex: 1,
                padding: "7px",
                borderRadius: 8,
                // highlight the selected priority
                border: `1px solid ${form.priority === p ? PRIORITY_COLOR[p] : border}`,
                background:
                  form.priority === p
                    ? PRIORITY_COLOR[p] + "22"
                    : "transparent",
                color: PRIORITY_COLOR[p],
                fontWeight: 700,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: `1px solid ${border}`,
              background: "transparent",
              color: text,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!form.title.trim()}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              background: "#6366f1",
              color: "#fff",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              opacity: form.title.trim() ? 1 : 0.5,
            }}
          >
            {editTask ? "Save" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
