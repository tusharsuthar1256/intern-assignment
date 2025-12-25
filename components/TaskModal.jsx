"use client";

export default function TaskModal({
  isOpen,
  onClose,
  task,
  setTask,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {task?.id ? "Edit Task" : "New Task"}
        </h2>

        <div className="mt-4 space-y-3">
          <input
            placeholder="Task title"
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 bg-transparent"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />

          <textarea
            placeholder="Task description"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 bg-transparent"
            value={task.description}
            onChange={(e) =>
              setTask({ ...task, description: e.target.value })
            }
          />

          <select
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 bg-transparent"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border dark:border-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
