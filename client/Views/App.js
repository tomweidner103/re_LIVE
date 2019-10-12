import React from 'react'
import {connect} from 'react-redux'
import Nav from './Nav'
import Routes from './Routes'
import {getMessageThunk} from '../reducers/messages'

class App extends React.Component {
    constructor(){
        super()
    }

    async componentDidMount(){
        await this.props.getMessages()
        // this.props.getUsers()
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
    getMessages: getMessageThunk
}

export default connect(null, mapDispatch)(App)