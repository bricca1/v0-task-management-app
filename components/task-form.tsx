"use client"

import type React from "react"

import { useState } from "react"
import type { Task } from "@/app/page"
import { X, AlertCircle } from "lucide-react"

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => void
  onClose: () => void
}

export default function TaskForm({ onSubmit, onClose }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending" as const,
    assignee: "",
  })

  const [errors, setErrors] = useState({
    title: "",
    assignee: "",
  })

  const validateForm = () => {
    const newErrors = {
      title: "",
      assignee: "",
    }

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido"
    }

    if (!formData.assignee.trim()) {
      newErrors.assignee = "El responsable es requerido"
    }

    setErrors(newErrors)
    return !newErrors.title && !newErrors.assignee
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit(formData)
    setFormData({
      title: "",
      description: "",
      status: "pending",
      assignee: "",
    })
    setErrors({ title: "", assignee: "" })
  }

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-white/10 dark:border-slate-700/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Nueva Tarea</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Título *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value })
                if (e.target.value.trim()) {
                  setErrors({ ...errors, title: "" })
                }
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 dark:border-slate-600 focus:ring-blue-500"
              }`}
              placeholder="Ej: Implementar dashboard"
            />
            {errors.title && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all resize-none"
              placeholder="Describe los detalles de la tarea..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Asignado a *</label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => {
                setFormData({ ...formData, assignee: e.target.value })
                if (e.target.value.trim()) {
                  setErrors({ ...errors, assignee: "" })
                }
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all ${
                errors.assignee
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 dark:border-slate-600 focus:ring-blue-500"
              }`}
              placeholder="Nombre del responsable"
            />
            {errors.assignee && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.assignee}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Estado</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "pending" | "in-progress" | "completed",
                })
              }
              className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
            >
              <option value="pending">Por Hacer</option>
              <option value="in-progress">En Progreso</option>
              <option value="completed">Completada</option>
            </select>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Crear Tarea
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-semibold py-3 rounded-lg transition-all cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
