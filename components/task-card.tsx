'use client'

import { useState } from 'react'
import { Task } from '@/app/page'
import DeleteConfirmationModal from './delete-confirmation-modal'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  const handleConfirmDelete = () => {
    setShowDeleteConfirm(false)
    onDelete(task.id)
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 dark:text-white text-lg line-clamp-2">
              {task.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
              {task.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {task.assignee.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {task.assignee}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
            >
              Editar
            </button>
            <button
              onClick={handleDeleteClick}
              className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <DeleteConfirmationModal
          taskTitle={task.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </>
  )
}
