import {createStore, combineReducers, applyMiddleware} from 'redux'
import messages from './reducers/messages'
import users from './reducers/users'
import thunkMiddleware from 'redux-thunk'

const reducer = combineReducers({messages, users})

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export default store