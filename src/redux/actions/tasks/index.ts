import {
  Column,
  Subtask,
  TaskCreateData,
  TaskData
} from '../../../types/tasksTypes'
import * as taskActionTypes from './actionTypes'

export const loadTask = (
  listId: Column['id'],
  taskId: TaskData['id']
): taskActionTypes.loadTaskAction => ({
  type: taskActionTypes.LOAD_TASK,
  listId,
  taskId
})

export const createTask = (
  payload: TaskCreateData
): taskActionTypes.createTaskAction => ({
  type: taskActionTypes.CREATE_TASK,
  payload
})

export const editTitleTask = (
  title: TaskData['title']
): taskActionTypes.editTitleTaskAction => ({
  type: taskActionTypes.EDIT_TITLE_TASK,
  title
})

export const editDescriptionTask = (
  desc: TaskData['description']
): taskActionTypes.editDescriptionTaskAction => ({
  type: taskActionTypes.EDIT_DESCRIPTION_TASK,
  desc
})

export const editPriorityTask = (
  priority: TaskData['priority']
): taskActionTypes.editPriorityTaskAction => ({
  type: taskActionTypes.EDIT_PRIORITY_TASK,
  priority
})

export const addSubtask = (
  title: Subtask['title']
): taskActionTypes.addSubtaskAction => ({
  type: taskActionTypes.ADD_SUBTASK,
  title
})

export const editCheckedSubtask = (
  id: Subtask['id'],
  checked: Subtask['checked']
): taskActionTypes.editCheckedSubtaskAction => ({
  type: taskActionTypes.EDIT_CHECKED_SUBTASK,
  id,
  checked
})

export const editTitleSubtask = (
  id: Subtask['id'],
  title: Subtask['title']
): taskActionTypes.editTitleSubtaskAction => ({
  type: taskActionTypes.EDIT_TITLE_SUBTASK,
  id,
  title
})

export const sort = (
  droppableIdStart: string,
  droppableIdEnd: string,
  droppableIndexStart: number,
  droppableIndexEnd: number
): taskActionTypes.sortAction => ({
  type: taskActionTypes.SORT,
  payload: {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd
  }
})
