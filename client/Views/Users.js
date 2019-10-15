import React from 'react'
import {connect }from 'react-redux'
import axios from 'axios'
import {createUserThunk} from '../reducers/users'

class Users extends React.Component {
    constructor(){
        super()
        this.state = {
            name: ''
        }
    }

    onChange = ev => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    onSubmit = async (ev) => {
        ev.preventDefault()
        this.props.createUser(this.state)
        // localStorage.removeItem('user')
        // console.log(data)
        // await localStorage.setItem('user',data[0].id)
        // console.log(localStorage)
        this.setState({name: ""})
    }

    logout = async () => {
        await axios.post('api/users/logout')
    }
    render(){
        return (
            <div>
                <form>
                    <input value={this.state.name} name='name' onChange={this.onChange} />
                </form>
                <button onClick={this.onSubmit}>Sign In</button>
                <button onClick={this.logout}>Log out</button>
            </div>
        )
    }
}

const mD = {
    createUser: createUserThunk
}

export default connect(null, mD)(Users)