import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import socket from '../socket'
import {getMessageThunk} from '../reducers/messages'

class ChatForm extends React.Component {
    constructor(){
        super()
        this.state = {
            room: 'AP',
            messages: ['one', 'two', 'three'],
            body:""
        }
    }

    async componentDidMount(){
        await this.props.getMessages()
        await this.props.postMessage({body: 'one'})


    }

    onSendButtonPressed = (ev) => {
        ev.preventDefault()
        socket.on(this.state.room, msg => {
            if(msg) {
                this.props.postMessage(this.state.body)
            }
        })
        socket.emit(this.state.room, {body: this.state.body})

        
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    render(){
        const {messages} = this.props || []
        return (
        <div>
            <form>
                <input name='body' value={this.state.message} onChange={this.onChange} />
                <button onClick={this.onSendButtonPressed}>Button</button>
            </form>
            {
                messages.map((message, idx) => {
                    return (
                        <div key={idx}>{message}</div>
                    )
                })
            }

        </div>
        )
    }
}

const mapState = ({messages}) => {messages}

const mD = {
    getMessages: getMessageThunk
}

export default connect(mapState, mD)(ChatForm)