import {createStore, combineReducers} from 'redux'
import messages from './reducers/messages'


const reducer = combineReducers({messages})

const store = createStore(reducer)

export default store