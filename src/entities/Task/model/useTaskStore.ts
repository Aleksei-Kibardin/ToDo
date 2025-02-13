import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Task } from '@/shared/types/TaskTypes'
import { fetchTasks, addTask, updateTask, deleteTask } from '@/shared/api/tasks.api'
import { useToast } from 'vue-toastification'

const STORAGE_KEY = 'tasks'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>(loadTasksFromLocalStorage())
  const loading = ref(false)
  const error = ref<string | null>(null)
  const toast = useToast()

  const handleAsyncOperation = async <T>(
    operation: () => Promise<T>,
    errorMessage: string,
    successMessage?: string,
  ) => {
    loading.value = true
    error.value = null
    try {
      const result = await operation()
      if (successMessage) {
        toast.success(successMessage)
      }
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : errorMessage
      toast.error(errorMessage)
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
    const newTask = await handleAsyncOperation(
      () => addTask(task),
      'Ошибка добавления задачи',
      'Задача успешно добавлена',
    )
    tasks.value.push(newTask)
    saveTasksToLocalStorage()
  }

  const updateExistingTask = async (updatedTask: Task) => {
    const newTask = await handleAsyncOperation(
      () => updateTask(updatedTask),
      'Ошибка обновления задачи',
      'Задача успешно обновлена',
    )
    const index = tasks.value.findIndex((t) => t.id === newTask.id)
    if (index !== -1) {
      tasks.value[index] = newTask
      saveTasksToLocalStorage()
    }
  }

  const removeTask = async (taskId: string | number) => {
    await handleAsyncOperation(
      () => deleteTask(taskId),
      'Ошибка удаления задачи',
      'Задача успешно удалена',
    )
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
