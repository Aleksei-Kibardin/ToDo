export interface Task {
  id: number | string
  title: string
  description: string
  statusText: string
  status: string
  priorityValue: number
  priorityText: 'Высокий' | 'Средний' | 'Низкий'
}
