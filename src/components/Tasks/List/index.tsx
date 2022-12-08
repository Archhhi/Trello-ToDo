import { Column, TaskData } from '../../../types/tasksTypes'
import { Droppable } from 'react-beautiful-dnd'
import s from './styles.module.css'
import Task from '../Task'
import addIcon from '../../../assets/add_icon.svg'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../../../redux/actions/tasks'

interface PropsTypes {
  id: TaskData['id']
  title: TaskData['title']
  tasks: TaskData[]
  searchValue: string
  onActiveModalTask: (
    active: boolean,
    listId: Column['id'],
    taskId: TaskData['id']
  ) => void
}

const TasksList = React.memo(
  ({ id, title, tasks, searchValue, onActiveModalTask }: PropsTypes) => {
    const dispatch = useDispatch()
    const [isModeAddTask, setIsModeAddTask] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState<string>('')

    const onAddTask = (id: TaskData['id']) => {
      taskTitle.trim() && dispatch(createTask({ id, title: taskTitle }))
      setTaskTitle('')
    }
    console.log(searchValue)

    const taskItems = tasks
      .filter(
        (task) =>
          task.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      )
      .map((task, index) => (
        <Task
          key={task.id}
          index={index}
          listId={id}
          taskId={task.id}
          title={task.title}
          onActiveModalTask={onActiveModalTask}
        />
      ))

    return (
      <Droppable droppableId={String(id)}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={s.column}
          >
            <span className={s.columnTitle}>{title}</span>
            {taskItems}
            {provided.placeholder}
            {!isModeAddTask ? (
              <div
                onClick={() => setIsModeAddTask(true)}
                className={s.buttonAddTask}
              >
                <img src={addIcon} alt="add-icon" />
                <span>Добавить задачу</span>
              </div>
            ) : (
              <div
                className={s.addTaskWrapper}
                onBlur={() => setIsModeAddTask(false)}
              >
                <textarea
                  placeholder={'Введите заголовок для этой задачи'}
                  autoFocus={true}
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />

                <div
                  onMouseDown={() => onAddTask(id)}
                  className={s.buttonAddTask}
                >
                  <img src={addIcon} alt="add-icon" />
                  <span>Добавить задачу</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Droppable>
    )
  }
)

export default TasksList
