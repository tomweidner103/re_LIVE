import axios from "axios"

const GET_MESSAGES = 'GET_MESSAGES'
const POST_MESSAGE = 'POST_MESSAGE'
const DELETE_MESSAGE = "DELETE_MESSAGE'

const getMessages = (messages) => ({
    type: GET_MESSAGES,
    messages
})

const postMessage = (message) => ({
    type: POST_MESSAGE,
    message
})

const deleteMessage = (id) => ({
    type: DELETE_MESSAGE,
    id
})

export const getMessageThunk = () => async dispatch => {
    const {data} = await axios.get('/api/messages')
    dispatch(getMessages(data))
}

export const postMessageThunk =(body) => async dispatch => {
    const {data} =  await axios.post('/api/messages', {body})
    dispatch(postMessage(data))
}

export const deleteMessageThunk = (id) => async dispatch => {
    await axios.delete(`/api/messages/${id}`)
    dispatch(deleteMessage(id))
}

const messageReducer = (state=[], action) => {
    switch(action.type){
        case GET_MESSAGES:
            return action.messages
        case POST_MESSAGE:
            return [...state, action.message]
        case DELETE_MESSAGE:
            return [...state].filter(msg => msg.id !== action.id)
        default:
            return state
    }
}

export default messageReducer
