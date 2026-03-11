import { PRIORITY_COLOR } from "../constants";

export default function TaskCard({
  task,
  dragging,
  onDragStart,
  onEdit,
  onDelete,
  theme,
}) {
  const { card, border, muted } = theme;

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task.id)}
      style={{
        background: card,
        border: `1px solid ${border}`,
        borderRadius: 10,
        padding: "11px 13px",
        marginBottom: 10,
        cursor: "grab",
        opacity: dragging === task.id ? 0.4 : 1,
      }}
    >
      {}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 7,
        }}
      >
        {}
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 20,
            background: PRIORITY_COLOR[task.priority] + "22",
            color: PRIORITY_COLOR[task.priority],
          }}
        >
          ● {task.priority}
        </span>

        {}
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => onEdit(task)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
        {task.title}
      </p>

      {task.description && (
        <p style={{ fontSize: 12, color: muted, lineHeight: 1.5 }}>
          {task.description}
        </p>
      )}
    </div>
  );
}
