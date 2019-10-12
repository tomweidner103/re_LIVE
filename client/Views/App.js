import React from 'react'
import {connect} from 'react-redux'
import Nav from './Nav'
import ChatForm from './ChatForm'
import Routes from './Routes'

class App extends React.Component {
    constructor(){
        super()
    }

    componentDidMount(){
        // this.props.getMessages()
        // this.props.getUsers()
    }
    render(){
        return (
            <section>
                <Nav />
                {/* <ChatForm /> */}
                <Routes />
            </section>
        )
    }

}

const mapState = ({messages, users}) => {messages, users}

// const mapDispatch = {getMessages, getUsers}

export default connect(null)(App)