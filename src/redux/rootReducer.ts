import { combineReducers } from 'redux'
import { tasksReducer } from './reducers/tasksReducer'

export const rootReducer = combineReducers({ tasks: tasksReducer })

export type RootStateType = ReturnType<typeof rootReducer>
