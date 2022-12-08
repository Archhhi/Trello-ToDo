import { createStore } from 'redux'
import { rootReducer } from './rootReducer'

// convert object to string and store in localStorage
function saveToLocalStorage(state: any) {
  try {
    const serialisedState = JSON.stringify(state)
    localStorage.setItem('persistedState', serialisedState)
  } catch (e) {
    console.warn(e)
  }
}

// load string from localStorage and convert back in to an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('persistedState')
    if (serialisedState === null) return undefined
    return JSON.parse(serialisedState)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const store = createStore(rootReducer, loadFromLocalStorage())

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
