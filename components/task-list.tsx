"use client"

import type React from "react"

import type { Task } from "@/app/page"
import TaskCard from "./task-card"
import { useState } from "react"

interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (taskId: string, newStatus: "pending" | "in-progress" | "completed") => void
}

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  const pendingTasks = tasks.filter((t) => t.status === "pending")
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress")
  const completedTasks = tasks.filter((t) => t.status === "completed")
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, newStatus: "pending" | "in-progress" | "completed") => {
    e.preventDefault()
    if (draggedTask && draggedTask.status !== newStatus) {
      onStatusChange(draggedTask.id, newStatus)
    }
    setDraggedTask(null)
  }

  const handleDragEnd = () => {
    setDraggedTask(null)
  }

  const TaskColumn = ({
    title,
    tasks,
    color,
    status,
  }: {
    title: string
    tasks: Task[]
    color: string
    status: "pending" | "in-progress" | "completed"
  }) => (
    <div
      className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-slate-700 transition-all duration-200"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
      data-tour="column"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
        <span className="ml-auto bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      <div
        className={`space-y-4 min-h-32 p-2 rounded transition-colors ${
          draggedTask ? "bg-blue-50 dark:bg-slate-700/50 border border-dashed border-blue-300" : ""
        }`}
      >
        {tasks.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-center py-8">Sin tareas</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              onDragEnd={handleDragEnd}
              className="cursor-pointer opacity-100 hover:opacity-100 transition-opacity"
            >
              <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))
        )}
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TaskColumn title="Por Hacer" tasks={pendingTasks} color="bg-yellow-400" status="pending" />
      <TaskColumn title="En Progreso" tasks={inProgressTasks} color="bg-blue-500" status="in-progress" />
      <TaskColumn title="Completadas" tasks={completedTasks} color="bg-green-500" status="completed" />
    </div>
  )
}
