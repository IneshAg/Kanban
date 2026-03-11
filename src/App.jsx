import { useState, useEffect } from "react";

import Header from "./components/Header";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";

import { COLUMNS, INITIAL_TASKS, STORAGE_KEY } from "./constants";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [dragging, setDragging] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function openAddModal() {
    setEditTask(null);
    setForm({ title: "", description: "", priority: "medium" });
    setShowModal(true);
  }

  function openEditModal(task) {
    setEditTask(task);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function saveTask() {
    if (!form.title.trim()) return;

    if (editTask) {
      setTasks(
        tasks.map((t) =>
          t.id === editTask.id
            ? {
                ...t,
                title: form.title,
                description: form.description,
                priority: form.priority,
              }
            : t,
        ),
      );
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: form.title.trim(),
          description: form.description.trim(),
          priority: form.priority,
          column: "todo",
        },
      ]);
    }

    closeModal();
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function onDragStart(id) {
    setDragging(id);
  }
  function onDragOver(e) {
    e.preventDefault();
  }
  function onDrop(e, targetCol) {
    e.preventDefault();
    setTasks(
      tasks.map((t) => (t.id === dragging ? { ...t, column: targetCol } : t)),
    );
    setDragging(null);
  }

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  const theme = {
    bg: darkMode ? "#0d0d1a" : "#f3f4f6",
    surface: darkMode ? "#13131f" : "#ffffff",
    card: darkMode ? "#1c1c2e" : "#f9f9ff",
    border: darkMode ? "#2a2a3e" : "#e0e0ec",
    text: darkMode ? "#e8e8f0" : "#1a1a2e",
    muted: darkMode ? "#666680" : "#8888a0",
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
      }}
    >
      <Header
        search={search}
        setSearch={setSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onAddTask={openAddModal}
        theme={theme}
      />

      <div className="board">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            col={col}
            tasks={filteredTasks.filter((t) => t.column === col.id)}
            dragging={dragging}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onEdit={openEditModal}
            onDelete={deleteTask}
            theme={theme}
          />
        ))}
      </div>

      {showModal && (
        <TaskModal
          editTask={editTask}
          form={form}
          setForm={setForm}
          onSave={saveTask}
          onClose={closeModal}
          theme={theme}
        />
      )}
    </div>
  );
}
