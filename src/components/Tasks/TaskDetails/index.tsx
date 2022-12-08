import React, { useEffect, useState } from 'react'
import s from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTask } from '../../../redux/selectors/tasksSelectors'
import {
  editDescriptionTask,
  editPriorityTask,
  editTitleTask
} from '../../../redux/actions/tasks'
import {
  Subtask,
  TASK_PRIORITY,
  TaskComponentData,
  TaskData
} from '../../../types/tasksTypes'
import Subtasks from '../Subtasks'

const TaskDetails = () => {
  const dispatch = useDispatch()
  const task = useSelector(getTask)
  const [activeEditSubTask, setActiveEditSubTask] = useState<Subtask['id']>('')
  const [isActiveEditTitleTask, setIsActiveEditTitleTask] =
    useState<boolean>(false)

  const [isActiveChangePriorityTask, setIsActiveChangePriorityTask] =
    useState<boolean>(false)
  const [data, setData] = useState<TaskComponentData>({
    title: '',
    description: '',
    subtasks: [],
    priority: ''
  })

  useEffect(() => {
    if (task) {
      setData({
        ...data,
        title: task.title,
        description: task.description,
        subtasks: task.subtasks,
        priority: task.priority
      })
    }
  }, [task])

  const onChangeTaskTitle = () => {
    data.title.trim() && dispatch(editTitleTask(data.title))
    setIsActiveEditTitleTask(false)
  }

  const onSaveDescription = () => {
    data.description.trim() && dispatch(editDescriptionTask(data.description))
  }

  const onChangePriorityTask = (priority: TaskData['priority']) => {
    data.priority.trim() && dispatch(editPriorityTask(priority))
    setIsActiveChangePriorityTask(false)
  }

  return (
    <div className={s.mainWrapper}>
      <div className={s.mainContent}>
        <div
          className={s.mainTitle}
          onClick={() => setIsActiveEditTitleTask(true)}
        >
          <span>{task?.taskNumber}.</span>
          {!isActiveEditTitleTask ? (
            <h1>{task?.title}</h1>
          ) : (
            <input
              type="text"
              autoFocus
              value={data.title}
              onBlur={onChangeTaskTitle}
              onKeyPress={(e) => e.key === 'Enter' && onChangeTaskTitle()}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          )}
        </div>

        <div className={s.description}>
          <h2>Описание</h2>
          <div className={s.textAreaWrapper}>
            <textarea
              value={data.description}
              placeholder={'Добавить более подробное описание...'}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
            {data.description && (
              <button
                className={s.descButton}
                disabled={data.description === task?.description}
                onClick={onSaveDescription}
              >
                Сохранить
              </button>
            )}
          </div>
        </div>

        <Subtasks
          data={data}
          activeEditSubTask={activeEditSubTask}
          setData={setData}
          setActiveEditSubTask={setActiveEditSubTask}
        />
      </div>
      <div className={s.sideWrapper}>
        <div
          className={s.sideCol}
          onBlur={() => setIsActiveChangePriorityTask(false)}
        >
          <span className={s.sideColTitle}>Приоритет</span>
          {!isActiveChangePriorityTask ? (
            <span
              className={s.sideColContent}
              onClick={() => setIsActiveChangePriorityTask(true)}
            >
              {task?.priority}
            </span>
          ) : (
            <select
              autoFocus
              defaultValue={task?.priority}
              onChange={(e) => onChangePriorityTask(e.target.value)}
            >
              <option value={TASK_PRIORITY.LOW}>{TASK_PRIORITY.LOW}</option>
              <option value={TASK_PRIORITY.MIDDLE}>
                {TASK_PRIORITY.MIDDLE}
              </option>
              <option value={TASK_PRIORITY.HIGH}>{TASK_PRIORITY.HIGH}</option>
              <option value={TASK_PRIORITY.CRITICAL}>
                {TASK_PRIORITY.CRITICAL}
              </option>
            </select>
          )}
        </div>
        <div className={s.sideCol}>
          <span className={s.sideColTitle}>Дата создания</span>
          <span className={s.sideColContent}>{task?.created}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails
