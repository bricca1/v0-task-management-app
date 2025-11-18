'use client'

import { Task } from '@/app/page'
import TaskCard from './task-card'

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  const pendingTasks = tasks.filter((t) => t.status === 'pending')
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress')
  const completedTasks = tasks.filter((t) => t.status === 'completed')

  const TaskColumn = ({
    title,
    tasks,
    color,
  }: {
    title: string
    tasks: Task[]
    color: string
  }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <span className="ml-auto bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-center py-8">
            Sin tareas
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TaskColumn
        title="Por Hacer"
        tasks={pendingTasks}
        color="bg-yellow-400"
      />
      <TaskColumn
        title="En Progreso"
        tasks={inProgressTasks}
        color="bg-blue-500"
      />
      <TaskColumn
        title="Completadas"
        tasks={completedTasks}
        color="bg-green-500"
      />
    </div>
  )
}
