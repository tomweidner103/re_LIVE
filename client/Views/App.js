import React from 'react'
import {connect} from 'react-redux'
import Nav from './Nav'
import Routes from './Routes'
import {getMessageThunk} from '../reducers/messages'
import { getUsersThunk } from '../reducers/users'

class App extends React.Component {
    constructor(){
        super()
    }

    async componentDidMount(){
        await this.props.getMessages()
        await this.props.getUsers()
    }
    render(){
        return (
            <section>
                <Nav />
                <Routes />
            </section>
        )
    }

}

// const mapState = ({messages, users}) => {messages, users}

const mapDispatch = {
    getMessages: getMessageThunk,
    getUsers: getUsersThunk
}

export default connect(null, mapDispatch)(App)