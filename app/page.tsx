"use client"

import { useEffect, useState } from "react"
import TaskList from "@/components/task-list"
import TaskForm from "@/components/task-form"
import TaskModal from "@/components/task-modal"
import OnboardingTour from "@/components/onboarding-tour"

export interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  assignee: string
  createdAt: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showTour, setShowTour] = useState(false)

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks")
      const data = await res.json()
      setTasks(data)
      const hasVisited = localStorage.getItem("hasVisitedTourApp")
      if (!hasVisited && data.length <= 2) {
        setShowTour(true)
        localStorage.setItem("hasVisitedTourApp", "true")
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
      const newTask = await res.json()
      setTasks([...tasks, newTask])
      setShowForm(false)
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const handleUpdateTask = async (taskData: Task) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
      const updatedTask = await res.json()
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
      setEditingTask(null)
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  const handleStatusChange = async (taskId: string, newStatus: "pending" | "in-progress" | "completed") => {
    const taskToUpdate = tasks.find((t) => t.id === taskId)
    if (taskToUpdate) {
      await handleUpdateTask({ ...taskToUpdate, status: newStatus })
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      })
      setTasks(tasks.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 p-6 md:p-8">
      {showTour && <OnboardingTour onClose={() => setShowTour(false)} />}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
              Gestor de Tareas
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Gestiona las tareas de tu equipo de forma eficiente y colaborativa
            </p>
          </div>
          <div className="group relative">
            <button
              onClick={() => setShowTour(true)}
              className="px-3 py-2 text-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg flex items-center justify-center w-10 h-10 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <div className="absolute right-0 top-12 bg-gray-800 text-white text-sm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Recorrido por la app
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(true)}
            id="new-task-btn"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
          >
            + Nueva Tarea
          </button>
        </div>

        {/* Forms and Modals */}
        {showForm && <TaskForm onSubmit={handleAddTask} onClose={() => setShowForm(false)} />}

        {editingTask && (
          <TaskModal task={editingTask} onSubmit={handleUpdateTask} onClose={() => setEditingTask(null)} />
        )}

        {/* Tasks List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </main>
  )
}
