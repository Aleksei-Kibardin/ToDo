import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '@/shared/types/TaskTypes'
import { fetchTasks, addTask, updateTask, deleteTask } from '@/shared/api/tasks.api'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([])
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
  }

  const addNewTask = async (task: Omit<Task, 'id'>) => {
    const newTask = await handleAsyncOperation(() => addTask(task), 'Ошибка добавления задачи')
    tasks.value.push(newTask)
  }

  const updateExistingTask = async (updatedTask: Task) => {
    const newTask = await handleAsyncOperation(
      () => updateTask(updatedTask),
      'Ошибка обновления задачи',
    )
    const index = tasks.value.findIndex((t) => t.id === newTask.id)
    if (index !== -1) {
      tasks.value[index] = newTask
    }
  }

  const removeTask = async (taskId: string | number) => {
    await handleAsyncOperation(() => deleteTask(taskId), 'Ошибка удаления задачи')
    tasks.value = tasks.value.filter((t) => t.id !== taskId)
  }

  const completedTasks = computed(() => tasks.value.filter((task) => task.completed))
  const activeTasks = computed(() => tasks.value.filter((task) => !task.completed))

  return {
    tasks,
    loading,
    error,
    fetchAllTasks,
    addNewTask,
    updateExistingTask,
    removeTask,
    completedTasks,
    activeTasks,
  }
})
