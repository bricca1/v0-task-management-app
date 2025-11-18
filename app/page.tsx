'use client'

import { useEffect, useState } from 'react'
import TaskList from '@/components/task-list'
import TaskForm from '@/components/task-form'
import TaskModal from '@/components/task-modal'

export interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  assignee: string
  createdAt: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks')
      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAddTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })
      const newTask = await res.json()
      setTasks([...tasks, newTask])
      setShowForm(false)
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const handleUpdateTask = async (taskData: Task) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })
      const updatedTask = await res.json()
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
      setEditingTask(null)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks?id=${id}`, {
        method: 'DELETE',
      })
      setTasks(tasks.filter((t) => t.id !== id))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
            Gestor de Tareas
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Gestiona las tareas de tu equipo de forma eficiente y colaborativa
          </p>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            + Nueva Tarea
          </button>
        </div>

        {/* Forms and Modals */}
        {showForm && (
          <TaskForm
            onSubmit={handleAddTask}
            onClose={() => setShowForm(false)}
          />
        )}

        {editingTask && (
          <TaskModal
            task={editingTask}
            onSubmit={handleUpdateTask}
            onClose={() => setEditingTask(null)}
          />
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
          />
        )}
      </div>
    </main>
  )
}
