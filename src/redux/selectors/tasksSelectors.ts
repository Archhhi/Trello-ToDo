import { RootStateType } from '../rootReducer'
import { Column, TaskData } from '../../types/tasksTypes'

export const getTask = ({ tasks: { task } }: RootStateType): TaskData | null =>
  task
export const getList = ({ tasks: { list } }: RootStateType): Column[] => list
export const getTasksLoading = ({
  tasks: { loading }
}: RootStateType): boolean => loading
