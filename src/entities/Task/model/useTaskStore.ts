import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Task } from '@/shared/types/TaskTypes'
import { fetchTasks, addTask, updateTask, deleteTask } from '@/shared/api/tasks.api'

const STORAGE_KEY = 'tasks'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>(loadTasksFromLocalStorage())
  const loading = ref(false)
  const error = ref<string | null>(null)

  const handleAsyncOperation = async <T>(operation: () => Promise<T>, errorMessage: string) => {
    loading.value = true
    error.value = null
    try {
      return await operation()
    } catch (err) {
      error.value = err instanceof Error ? err.message : errorMessage
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchAllTasks = async () => {
    tasks.value = await handleAsyncOperation(() => fetchTasks(), 'Ошибка загрузки задач')
    saveTasksToLocalStorage()
  }

  const addNewTask = async (task: Omit<Task, 'id'>) => {
    const newTask = await handleAsyncOperation(() => addTask(task), 'Ошибка добавления задачи')
    tasks.value.push(newTask)
    saveTasksToLocalStorage()
  }

  const updateExistingTask = async (updatedTask: Task) => {
    const newTask = await handleAsyncOperation(
      () => updateTask(updatedTask),
      'Ошибка обновления задачи',
    )
    const index = tasks.value.findIndex((t) => t.id === newTask.id)
    if (index !== -1) {
      tasks.value[index] = newTask
      saveTasksToLocalStorage()
    }
  }

  const removeTask = async (taskId: string | number) => {
    await handleAsyncOperation(() => deleteTask(taskId), 'Ошибка удаления задачи')
    tasks.value = tasks.value.filter((t) => t.id !== taskId)
    saveTasksToLocalStorage()
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
  }

  function loadTasksFromLocalStorage(): Task[] {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    return storedTasks ? JSON.parse(storedTasks) : []
  }

  watch(tasks, saveTasksToLocalStorage, { deep: true })

  return {
    tasks,
    loading,
    error,
    fetchAllTasks,
    addNewTask,
    updateExistingTask,
    removeTask,
  }
})
