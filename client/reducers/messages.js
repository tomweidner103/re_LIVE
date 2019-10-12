import axios from "axios"

const GET_MESSAGES = 'GET_MESSAGES'
const POST_MESSAGE = 'POST_MESSAGE'

const getMessages = (messages) => ({
    type: GET_MESSAGES,
    messages
})

const postMessage = (message) => ({
    type: POST_MESSAGE,
    message
})

export const getMessageThunk = () => async dispatch => {
    const {data} = await axios.get('/api/messages')
    console.log(data)
    dispatch(getMessages(data))
}

export const postMessageThunk =(body) => async dispatch => {
    console.log(body)
    const {data} =  await axios.post('/api/messages', {body})
    dispatch(postMessage(data))
}

const messageReducer = (state=[], action) => {
    switch(action.type){
        case GET_MESSAGES:
            return action.messages
        case POST_MESSAGE:
            return [action.message, ...state]
        default:
            return state
    }
}

export default messageReducer