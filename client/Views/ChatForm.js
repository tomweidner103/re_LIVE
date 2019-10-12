import React from 'react'
import { connect } from 'react-redux'
import socket from '../socket'
import {postMessageThunk, getMessageThunk} from '../reducers/messages'

class ChatForm extends React.Component {
    constructor(){
        super()
        this.state = {
            room: 'AP',
            body:""
        }
    }
    async componentDidMount(){
        socket.on(this.state.room, msg => {
            if(msg) {
                this.props.getMessages()
            }
        })
    }

    onSendButtonPressed = async (ev) => {
        ev.preventDefault()
        await this.props.postMessage(this.state.body)
        socket.emit(this.state.room, {body: this.state.body})
        this.setState({body: ''})
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    render(){
        const {messages} = this.props || []
        return (
        <div>
            <form>
                <input name='body' value={this.state.body} onChange={this.onChange} />
                <button onClick={this.onSendButtonPressed}>Button</button>
            </form>
            {
                messages.map(message => {
                    return (
                        <div key={message.id}>{message.body}</div>
                    )
                })
            }

        </div>
        )
    }
}

const mapState = state => {
    return {
        messages: state.messages
    }
}

const md = {
    postMessage: postMessageThunk,
    getMessages: getMessageThunk
}


export default connect(mapState, md)(ChatForm)