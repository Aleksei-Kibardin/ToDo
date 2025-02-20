import type { Task } from '@/shared/types/TaskTypes'

const API_URL = 'http://localhost:5000/tasks'

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Ошибка загрузки задач')
  }
  return response.json()
}

export async function addTask(task: Omit<Task, 'id'>): Promise<Task> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
  if (!response.ok) {
    throw new Error('Ошибка добавления задачи')
  }
  return response.json()
}

export async function updateTask(updatedTask: Task): Promise<Task> {
  const response = await fetch(`${API_URL}/${updatedTask.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  })
  if (!response.ok) {
    throw new Error('Ошибка обновления задачи')
  }
  return response.json()
}

export async function deleteTask(taskId: string | number): Promise<void> {
  const response = await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error('Ошибка удаления задачи')
  }
}
