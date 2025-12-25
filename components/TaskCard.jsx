"use client";

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-800">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
        {task.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
        {task.description}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">
          Status: {task.status}
        </span>

        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="text-blue-600 text-sm hover:underline"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 text-sm hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
