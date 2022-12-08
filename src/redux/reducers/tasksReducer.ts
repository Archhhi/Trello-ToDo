import {
  STATUS,
  TASK_PRIORITY,
  TaskData,
  TasksState
} from '../../types/tasksTypes'
import * as taskActionTypes from '../actions/tasks/actionTypes'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

const initialState: TasksState = {
  loading: false,
  listId: null,
  task: null,
  list: [
    {
      id: uuidv4(),
      title: STATUS.QUEUE,
      tasks: []
    },
    {
      id: uuidv4(),
      title: STATUS.DEVELOPMENT,
      tasks: []
    },
    {
      id: uuidv4(),
      title: STATUS.DONE,
      tasks: []
    }
  ]
}

export const tasksReducer = (
  state: TasksState = initialState,
  action: taskActionTypes.TaskAction
): TasksState => {
  switch (action.type) {
    case taskActionTypes.LOAD_TASK: {
      const list = state.list.find((list) => list.id === action.listId)
      const loadTask = list!.tasks.find((task) => task.id === action.taskId)

      return {
        ...state,
        listId: list!.id,
        task: loadTask!
      }
    }
    case taskActionTypes.CREATE_TASK: {
      const list = state.list.find((list) => list.id === action.payload.id)
      const count = list && list.tasks.length + 1

      const newTask: TaskData = {
        id: uuidv4(),
        taskNumber: count!,
        title: action.payload.title,
        description: '',
        created: moment().format('DD.MM.YYYY'),
        priority: TASK_PRIORITY.MIDDLE,
        subtasks: []
      }

      return {
        ...state,
        list: state.list.map((column) =>
          column.id === action.payload.id
            ? { ...column, tasks: [...column.tasks, newTask] }
            : column
        )
      }
    }
    case taskActionTypes.EDIT_TITLE_TASK: {
      return {
        ...state,
        task: {
          ...state.task!,
          title: action.title
        },
        list: state.list.map((list) =>
          list.id === state.listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === state.task?.id
                    ? { ...task, title: action.title }
                    : task
                )
              }
            : list
        )
      }
    }
    case taskActionTypes.EDIT_DESCRIPTION_TASK: {
      return {
        ...state,
        task: {
          ...state.task!,
          description: action.desc
        },
        list: state.list.map((list) =>
          list.id === state.listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === state.task?.id
                    ? { ...task, description: action.desc }
                    : task
                )
              }
            : list
        )
      }
    }
    case taskActionTypes.EDIT_PRIORITY_TASK: {
      return {
        ...state,
        task: {
          ...state.task!,
          priority: action.priority
        },
        list: state.list.map((list) =>
          list.id === state.listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === state.task?.id
                    ? { ...task, priority: action.priority }
                    : task
                )
              }
            : list
        )
      }
    }
    case taskActionTypes.ADD_SUBTASK: {
      const newSubtask = {
        id: uuidv4(),
        checked: false,
        title: action.title
      }

      return {
        ...state,
        task: {
          ...state.task!,
          subtasks: [...state.task!.subtasks, newSubtask]
        },
        list: state.list.map((list) =>
          list.id === state.listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === state.task?.id
                    ? { ...task, subtasks: [...task.subtasks, newSubtask] }
                    : task
                )
              }
            : list
        )
      }
    }
    case taskActionTypes.EDIT_CHECKED_SUBTASK: {
      return {
        ...state,
        task: {
          ...state.task!,
          subtasks: state.task!.subtasks.map((subtask) =>
            subtask.id === action.id
              ? { ...subtask, checked: action.checked }
              : subtask
          )
        },
        list: state.list.map((list) =>
          list.id === state.listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === state.task?.id
                    ? {
                        ...task,
                        subtasks: task.subtasks.map((subtask) =>
                          subtask.id === action.id
                            ? { ...subtask, checked: action.checked }
                            : subtask
                        )
                      }
                    : task
                )
              }
            : list
        )
      }
    }
    case taskActionTypes.EDIT_TITLE_SUBTASK: {
      return {
        ...state,
        task: {
          ...state.task!,
          subtasks: state.task!.subtasks.map((subtask) =>
            subtask.id === action.id
              ? { ...subtask, title: action.title }
              : subtask
          )
        },
        list: state.list.map((list) =>
          list.id === state.listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === state.task?.id
                    ? {
                        ...task,
                        subtasks: task.subtasks.map((subtask) =>
                          subtask.id === action.id
                            ? { ...subtask, title: action.title }
                            : subtask
                        )
                      }
                    : task
                )
              }
            : list
        )
      }
    }
    case taskActionTypes.SORT: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd
      } = action.payload

      // in the same column
      if (droppableIdStart === droppableIdEnd) {
        const column = state.list.find(
          (column) => droppableIdStart === column.id
        )
        const task = column!.tasks.splice(droppableIndexStart, 1)
        column!.tasks.splice(droppableIndexEnd, 0, ...task)
      }

      // other column
      if (droppableIdStart !== droppableIdEnd) {
        // find the column where drag happened
        const columnStart = state.list.find(
          (column) => droppableIdStart === column.id
        )

        // pull out the task from this column
        const task = columnStart!.tasks.splice(droppableIndexStart, 1)

        // find the column where drag ended
        const columnEnd = state.list.find(
          (column) => droppableIdEnd === column.id
        )

        // put the column in the new list
        columnEnd!.tasks.splice(droppableIndexEnd, 0, ...task)
      }

      return {
        ...state,
        list: [...state.list]
      }
    }
    default:
      return state
  }
}
