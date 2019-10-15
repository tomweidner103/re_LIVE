import axios from 'axios'

const GET_USERS = "GET_USERS"
const CREATE_USER = "CREATE_USER"

const getUsers = users => ({
    type: GET_USERS,
    users
})

const createUser= user => ({
    type: CREATE_USER,
    user
})

export const getUsersThunk = () => async dispatch => {
    const {data} = await axios.get('/api/users')
    dispatch(getUsers(data))
}

export const createUserThunk = (user) => async dispatch => {
    const {data} = await axios.post('/api/users', user)
    dispatch(createUser(data))
}

const usersReducer = (state=[], action) =>{
    switch(action.type){
        case GET_USERS:
            return action.users
        case CREATE_USER:
            return [...state, action.user]
        default:
            return state
    }
}

export default usersReducer
