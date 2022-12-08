export enum TASK_PRIORITY {
  LOW = 'низкий',
  MIDDLE = 'средний',
  HIGH = 'высокий',
  CRITICAL = 'критичный'
}

export enum STATUS {
  QUEUE = 'Очередь',
  DEVELOPMENT = 'Разработка',
  DONE = 'Готово'
}

export interface Subtask {
  id: string
  checked: boolean
  title: string
}

export interface Column {
  id: string
  title: STATUS
  tasks: TaskData[]
}

export interface TaskData {
  id: string
  taskNumber: number
  title: string
  description: string
  created: string
  priority: string
  subtasks: Subtask[]
}

export interface TasksState {
  loading: boolean
  listId: null | Column['id']
  task: TaskData | null
  list: Column[]
}

export interface TaskCreateData {
  id: string
  title: string
}

export interface TaskComponentData {
  title: TaskData['title']
  description: TaskData['description']
  subtasks: Subtask[]
  priority: TaskData['priority']
}
