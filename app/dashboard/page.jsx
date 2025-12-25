"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";

const STATUS_FILTERS = ["All", "Pending", "In Progress", "Completed"];

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  // 🔍 NEW STATE
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data || []);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openNewTask = () => {
    setCurrentTask({ title: "", description: "", status: "Pending" });
    setModalOpen(true);
  };

  const saveTask = async () => {
    if (currentTask._id) {
      await fetch(`/api/tasks/${currentTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTask),
      });
    } else {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTask),
      });
    }

    setModalOpen(false);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  // 🔥 FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesTitle && matchesStatus;
  });

  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-black py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold dark:text-white">Tasks</h1>

          <button
            onClick={openNewTask}
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg"
          >
            + New Task
          </button>
        </div>

        {/* 🔍 SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by task title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg dark:border-gray-700 bg-white dark:bg-transparent dark:text-white"
          />

          {/* Status Filters */}
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm border
                  ${
                    statusFilter === status
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white dark:bg-transparent dark:text-white"
                  }
                `}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* TASK GRID */}
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => {
                  setCurrentTask(task);
                  setModalOpen(true);
                }}
                onDelete={() => deleteTask(task._id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        task={currentTask}
        setTask={setCurrentTask}
        onSave={saveTask}
      />
    </div>
  );
}
