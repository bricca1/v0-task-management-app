"use client"

import { useEffect, useState } from "react"

interface OnboardingTourProps {
  onClose: () => void
}

export default function OnboardingTour({ onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Bienvenido al Gestor de Tareas",
      description: "Te mostraremos cómo crear y gestionar tareas fácilmente.",
      selector: "none",
    },
    {
      title: "Crear una Nueva Tarea",
      description: "Haz click aquí para crear una nueva tarea en tu equipo.",
      selector: "#new-task-btn",
    },
    {
      title: "Organiza tus Tareas",
      description:
        "Las tareas se organizan en 3 columnas: Por Hacer, En Progreso y Completadas. Puedes arrastra tareas entre columnas para cambiar su estado.",
      selector: '[data-tour="column"]',
    },
    {
      title: "Completa el Tutorial",
      description: "Ahora estás listo para gestionar tareas. Puedes ver este tutorial nuevamente en cualquier momento.",
      selector: "none",
    },
  ]

  const currentStepData = steps[currentStep]
  const targetElement = currentStepData.selector !== "none" ? document.querySelector(currentStepData.selector) : null
  const rect = targetElement?.getBoundingClientRect()

  useEffect(() => {
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [currentStep, targetElement])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/15 z-40 pointer-events-none transition-all duration-300"
        style={{
          clipPath: rect
            ? `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, ${rect.left - 8}px ${rect.top - 8}px, ${rect.left - 8}px ${rect.bottom + 8}px, ${rect.right + 8}px ${rect.bottom + 8}px, ${rect.right + 8}px ${rect.top - 8}px, ${rect.left - 8}px ${rect.top - 8}px)`
            : undefined,
        }}
      />

      {rect && (
        <div
          className="fixed border-3 border-blue-500 rounded-lg pointer-events-none z-40"
          style={{
            left: `${rect.left - 8}px`,
            top: `${rect.top - 8}px`,
            width: `${rect.width + 16}px`,
            height: `${rect.height + 16}px`,
            transition: "all 0.3s ease",
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.8), inset 0 0 20px rgba(59, 130, 246, 0.2)",
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="fixed bg-white dark:bg-slate-800 rounded-lg shadow-2xl z-50 p-6 max-w-sm border border-gray-200 dark:border-slate-700"
        style={{
          left: rect ? `${Math.max(16, Math.min(rect.left, window.innerWidth - 400))}px` : "50%",
          top: rect ? `${rect.bottom + 20}px` : "50%",
          transform: rect ? "none" : "translate(-50%, -50%)",
        }}
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{currentStepData.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{currentStepData.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full transition-colors ${
                  idx === currentStep ? "bg-blue-500" : "bg-gray-300 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                Atrás
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              {currentStep === steps.length - 1 ? "Listo" : "Siguiente"}
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
