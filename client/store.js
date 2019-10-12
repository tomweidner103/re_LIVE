import {createStore, combineReducers, applyMiddleware} from 'redux'
import messages from './reducers/messages'
import thunkMiddleware from 'redux-thunk'

const reducer = combineReducers({messages})

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export default store