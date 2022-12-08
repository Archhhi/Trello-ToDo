import React, { useMemo, useState } from 'react'
import s from './styles.module.css'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { getList } from '../../redux/selectors/tasksSelectors'
import { loadTask, sort } from '../../redux/actions/tasks'
import TasksList from '../../components/Tasks/List'
import Modal from '../../components/Modal'
import TaskDetails from '../../components/Tasks/TaskDetails'
import { Column, TaskData } from '../../types/tasksTypes'
import Search from '../../components/Search'

const Tasks = () => {
  const dispatch = useDispatch()
  const listColumns = useSelector(getList)
  const [modalActive, setModalActive] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      )
    )
  }

  const onActiveModalTask = (
    active: boolean,
    listId: Column['id'],
    taskId: TaskData['id']
  ) => {
    setModalActive(active)
    dispatch(loadTask(listId, taskId))
  }

  const list = useMemo(
    () =>
      listColumns.map((column) => (
        <TasksList
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={column.tasks}
          searchValue={searchValue}
          onActiveModalTask={onActiveModalTask}
        />
      )),
    [listColumns, searchValue]
  )

  return (
    <>
      <div className={s.mainWrapper}>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={s.columnWrapper}>{list}</div>
        </DragDropContext>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <TaskDetails />
      </Modal>
    </>
  )
}

export default Tasks
