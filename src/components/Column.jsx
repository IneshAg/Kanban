import TaskCard from "./TaskCard";

export default function Column({
  col,
  tasks,
  dragging,
  onDragStart,
  onDragOver,
  onDrop,
  onEdit,
  onDelete,
  theme,
}) {
  const { surface, border, muted } = theme;

  return (
    <div
      className="column"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, col.id)}
      style={{
        background: surface,
        borderRadius: 12,
        border: `1px solid ${border}`,
        borderTop: `3px solid ${col.accent}`,
        padding: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: col.accent,
            display: "inline-block",
          }}
        />

        <strong style={{ fontSize: 14 }}>{col.label}</strong>

        <span
          style={{
            marginLeft: "auto",
            background: col.accent + "22",
            color: col.accent,
            borderRadius: 12,
            padding: "1px 10px",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "28px 0",
            color: muted,
            fontSize: 13,
            border: `2px dashed ${border}`,
            borderRadius: 8,
          }}
        >
          Drop tasks here
        </div>
      )}

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          dragging={dragging}
          onDragStart={onDragStart}
          onEdit={onEdit}
          onDelete={onDelete}
          theme={theme}
        />
      ))}
    </div>
  );
}
