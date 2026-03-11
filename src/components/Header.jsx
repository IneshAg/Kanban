export default function Header({
  search,
  setSearch,
  darkMode,
  setDarkMode,
  onAddTask,
  theme,
}) {
  const { surface, border, bg, text } = theme;

  return (
    <header
      style={{
        background: surface,
        borderBottom: `1px solid ${border}`,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <h1 style={{ fontSize: 20, fontWeight: 700, marginRight: "auto" }}>
        📋 Kanban Board
      </h1>

      <input
        className="header-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍  Search tasks…"
        style={{
          padding: "7px 12px",
          borderRadius: 8,
          border: `1px solid ${border}`,
          background: bg,
          color: text,
          fontSize: 13,
        }}
      />

      <button
        onClick={onAddTask}
        style={{
          padding: "8px 18px",
          borderRadius: 8,
          background: "#6366f1",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        + Add Task
      </button>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          background: border,
          color: text,
          border: "none",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
