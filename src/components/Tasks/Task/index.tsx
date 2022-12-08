import React from 'react'
import s from './styles.module.css'
import { Draggable } from 'react-beautiful-dnd'
import { Column, TaskData } from '../../../types/tasksTypes'

interface PropsTypes {
  listId: Column['id']
  taskId: TaskData['id']
  index: number
  title: TaskData['title']
  onActiveModalTask: (
    active: boolean,
    listId: Column['id'],
    taskId: TaskData['id']
  ) => void
}

const Task = React.memo(
  ({ listId, taskId, index, title, onActiveModalTask }: PropsTypes) => {
    const onActiveTask = (taskId: TaskData['id']) => {
      onActiveModalTask(true, listId, taskId)
    }

    return (
      <Draggable draggableId={String(taskId)} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={s.task}
            onClick={() => onActiveTask(taskId)}
          >
            <span>{title}</span>
          </div>
        )}
      </Draggable>
    )
  }
)

export default Task
