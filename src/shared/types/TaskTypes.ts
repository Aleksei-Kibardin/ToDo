export interface Task {
  id: number
  title: string
  description: string
  statusText: string
  status: string
  priorityValue: number
  priorityText: 'Высокий' | 'Средний' | 'Низкий'
}
