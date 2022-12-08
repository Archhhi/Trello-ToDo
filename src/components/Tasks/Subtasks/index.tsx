import React, { useState } from 'react'
import s from './styles.module.css'
import closeIcon from '../../../assets/close_icon.svg'
import { Subtask, TaskComponentData, TaskData } from '../../../types/tasksTypes'
import {
  addSubtask,
  editCheckedSubtask,
  editTitleSubtask
} from '../../../redux/actions/tasks'
import { useDispatch } from 'react-redux'

interface SubtasksPropsTypes {
  data: TaskComponentData
  activeEditSubTask: TaskData['id']
  setData: (data: TaskComponentData) => void
  setActiveEditSubTask: (subtaskId: Subtask['id']) => void
}

const Subtasks = React.memo(
  ({
    data,
    activeEditSubTask,
    setData,
    setActiveEditSubTask
  }: SubtasksPropsTypes) => {
    const dispatch = useDispatch()
    const [subTaskTitle, setSubTaskTitle] = useState<Subtask['title']>('')
    const [isActiveAddSubTask, setIsActiveAddSubTask] = useState<boolean>(false)

    const onAddSubTask = () => {
      subTaskTitle.trim() && dispatch(addSubtask(subTaskTitle))
      setIsActiveAddSubTask(false)
    }

    const onChangeCheckedSubtask = (
      id: Subtask['id'],
      checked: Subtask['checked']
    ) => {
      dispatch(editCheckedSubtask(id, checked))
    }

    const onChangeTitleSubtask = (
      id: Subtask['id'],
      title: Subtask['title']
    ) => {
      setSubTaskTitle(title)
      setData({
        ...data,
        subtasks: data.subtasks.map((subtask) =>
          subtask.id === id ? { ...subtask, title: title } : subtask
        )
      })
    }

    const onEditTitleSubtask = (id: Subtask['id']) => {
      subTaskTitle.trim() && dispatch(editTitleSubtask(id, subTaskTitle))
      setActiveEditSubTask('')
    }

    const subtasks =
      data.subtasks &&
      data.subtasks.map((subtask, i) => (
        <div key={subtask.id} className={s.subtaskInputWrapper}>
          <input
            type="checkbox"
            checked={subtask.checked}
            onChange={(e) =>
              onChangeCheckedSubtask(subtask.id, e.target.checked)
            }
          />
          {activeEditSubTask !== subtask.id ? (
            <span
              className={s.subtaskTitle}
              onClick={() => setActiveEditSubTask(subtask.id)}
            >
              {subtask.title}
            </span>
          ) : (
            <div className={s.editTitleSubtaskWrapper}>
              <input
                type="text"
                value={data.subtasks[i].title}
                autoFocus
                onChange={(e) =>
                  onChangeTitleSubtask(subtask.id, e.target.value)
                }
              />
              <button onClick={() => onEditTitleSubtask(subtask.id)}>
                Сохранить
              </button>
              <img
                src={closeIcon}
                alt="close-icon"
                onClick={() => setActiveEditSubTask('')}
              />
            </div>
          )}
        </div>
      ))

    return (
      <div className={s.subtaskWrapper}>
        <h2>Подзадачи</h2>
        {subtasks}
        {!isActiveAddSubTask ? (
          <button
            className={s.subtaskButton}
            onClick={() => setIsActiveAddSubTask(true)}
          >
            Добавить задачу
          </button>
        ) : (
          <div className={s.subtaskAddWrapper}>
            <input
              type="text"
              autoFocus
              onChange={(e) => setSubTaskTitle(e.target.value)}
            />
            <div className={s.subtaskAddBtnWrapper}>
              <button className={s.subtaskButton} onClick={onAddSubTask}>
                Добавить
              </button>
              <img
                src={closeIcon}
                alt="close-icon"
                onClick={() => setIsActiveAddSubTask(false)}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
)

export default Subtasks
