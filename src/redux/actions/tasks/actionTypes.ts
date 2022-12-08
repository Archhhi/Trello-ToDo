import {
  Column,
  Subtask,
  TaskCreateData,
  TaskData
} from '../../../types/tasksTypes'

const actionType = 'src/taskActionTypes'

export const LOAD_TASK = `${actionType}/LOAD_TASK`
export interface loadTaskAction {
  type: typeof LOAD_TASK
  listId: Column['id']
  taskId: TaskData['id']
}

export const CREATE_TASK = `${actionType}/CREATE_TASK`
export interface createTaskAction {
  type: typeof CREATE_TASK
  payload: TaskCreateData
}

export const EDIT_TITLE_TASK = `${actionType}/EDIT_TITLE_TASK`
export interface editTitleTaskAction {
  type: typeof EDIT_TITLE_TASK
  title: TaskData['title']
}

export const EDIT_DESCRIPTION_TASK = `${actionType}/EDIT_DESCRIPTION_TASK`
export interface editDescriptionTaskAction {
  type: typeof EDIT_DESCRIPTION_TASK
  desc: TaskData['description']
}

export const EDIT_PRIORITY_TASK = `${actionType}/EDIT_PRIORITY_TASK`
export interface editPriorityTaskAction {
  type: typeof EDIT_PRIORITY_TASK
  priority: TaskData['priority']
}

export const ADD_SUBTASK = `${actionType}/ADD_SUBTASK`
export interface addSubtaskAction {
  type: typeof ADD_SUBTASK
  title: Subtask['title']
}

export const EDIT_CHECKED_SUBTASK = `${actionType}/EDIT_CHECKED_SUBTASK`
export interface editCheckedSubtaskAction {
  type: typeof EDIT_CHECKED_SUBTASK
  id: Subtask['id']
  checked: Subtask['checked']
}

export const EDIT_TITLE_SUBTASK = `${actionType}/EDIT_TITLE_SUBTASK`
export interface editTitleSubtaskAction {
  type: typeof EDIT_TITLE_SUBTASK
  id: Subtask['id']
  title: Subtask['title']
}

export const SORT = `${actionType}/SORT`
export interface sortAction {
  type: typeof SORT
  payload: any
}

export type TaskAction = loadTaskAction &
  createTaskAction &
  editTitleTaskAction &
  editDescriptionTaskAction &
  editPriorityTaskAction &
  addSubtaskAction &
  editCheckedSubtaskAction &
  editTitleSubtaskAction &
  sortAction
