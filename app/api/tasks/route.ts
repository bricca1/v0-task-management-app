import { NextRequest, NextResponse } from 'next/server'

// Store tasks in memory (will reset on server restart)
let tasks: Array<{
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  assignee: string
  createdAt: string
}> = [
  {
    id: '1',
    title: 'Diseñar interfaz de usuario',
    description: 'Crear mockups y diseños para la nueva interfaz',
    status: 'in-progress',
    assignee: 'Ana García',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Revisar código',
    description: 'Realizar code review de los PRs pendientes',
    status: 'pending',
    assignee: 'Carlos López',
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newTask = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description,
    status: body.status || 'pending',
    assignee: body.assignee,
    createdAt: new Date().toISOString(),
  }
  tasks.push(newTask)
  return NextResponse.json(newTask, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const index = tasks.findIndex((t) => t.id === body.id)
  if (index === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }
  tasks[index] = { ...tasks[index], ...body }
  return NextResponse.json(tasks[index])
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const index = tasks.findIndex((t) => t.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }
  const deletedTask = tasks.splice(index, 1)
  return NextResponse.json(deletedTask[0])
}
