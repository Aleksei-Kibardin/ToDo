import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTaskStore } from '@/entities/Task/model/useTaskStore'
import { setActivePinia, createPinia } from 'pinia'
import { fetchTasks, addTask, updateTask, deleteTask } from '@/shared/api/tasks.api'
import type { Task } from '@/shared/types/TaskTypes'

vi.mock('@/shared/api/tasks.api', () => ({
  fetchTasks: vi.fn(),
  addTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}))

describe('Task Store', () => {
  let store: ReturnType<typeof useTaskStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
  })

  it('should fetch tasks', async () => {
    const mockTasks: Task[] = [
      {
        id: '3',
        title: 'Задача 3',
        description: 'Описание задачи 3',
        statusText: 'Отложено',
        status: 'deferred',
        priorityText: 'Низкий',
        priorityValue: 1,
      },
    ]
    ;(fetchTasks as vi.Mock).mockResolvedValue(mockTasks)

    await store.fetchAllTasks()

    expect(store.tasks).toEqual(mockTasks)
  })

  it('should add a new task', async () => {
    const newTask: Omit<Task, 'id'> = {
      title: 'Новая задача',
      description: 'Описание новой задачи',
      statusText: 'В процессе',
      status: 'in_progress',
      priorityText: 'Средний',
      priorityValue: 2,
    }
    const createdTask: Task = { id: '4', ...newTask }
    ;(addTask as vi.Mock).mockResolvedValue(createdTask)

    await store.addNewTask(newTask)

    expect(store.tasks).toContainEqual(createdTask)
  })

  it('should update an existing task', async () => {
    const existingTask: Task = {
      id: '3',
      title: 'Задача 3',
      description: 'Описание задачи 3',
      statusText: 'Отложено',
      status: 'deferred',
      priorityText: 'Низкий',
      priorityValue: 1,
    }
    store.tasks = [existingTask]

    const updatedTask: Task = { ...existingTask, title: 'Обновленная задача 3' }
    ;(updateTask as vi.Mock).mockResolvedValue(updatedTask)

    await store.updateExistingTask(updatedTask)

    expect(store.tasks.find((task) => task.id === updatedTask.id)).toEqual(updatedTask)
  })

  it('should remove a task', async () => {
    const taskToRemove: Task = {
      id: '3',
      title: 'Задача 3',
      description: 'Описание задачи 3',
      statusText: 'Отложено',
      status: 'deferred',
      priorityText: 'Низкий',
      priorityValue: 1,
    }
    store.tasks = [taskToRemove]
    ;(deleteTask as vi.Mock).mockResolvedValue(undefined)

    await store.removeTask(taskToRemove.id)

    expect(store.tasks).not.toContainEqual(taskToRemove)
  })
})
