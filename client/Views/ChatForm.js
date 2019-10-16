import React from 'react'
import { connect } from 'react-redux'
import socket from '../socket'
import {postMessageThunk, getMessageThunk, deleteMessageThunk} from '../reducers/messages'

class ChatForm extends React.Component {
    constructor(){
        super()
        this.state = {
            room: 'AP',
            body:"",
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
        //creates msg in db
        await this.props.postMessage(this.state.body)
        //sends the body to the socket event emitter
        socket.emit(this.state.room, {body: this.state.body})
        this.setState({body: ''})
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }
    
    destroy = (id) => {
        this.props.destroy(id)
    }

    render(){
        const {messages, users} = this.props || []
        console.log(users)
        console.log(messages)
        return (
        <div>
            <form>
                <input name='body' value={this.state.body} onChange={this.onChange} />
                <button onClick={this.onSendButtonPressed}>Button</button>
            </form>
            {
                messages.map(message => {
                    let name = users.find(u => u.id === message.userId) || ''
                    if(!name.name){
                        name = {name: 'rando'}
                    }
                    return (
                        <div key={message.id}>Sender <b>{name.name}</b>: {message.body}</div>
                    )
                })
            }

        </div>
        )
    }
}

const mapState = state => {
    return {
        messages: state.messages,
        users: state.users
    }
}

const md = {
    postMessage: postMessageThunk,
    getMessages: getMessageThunk,
    destroy: deleteMessageThunk
}


export default connect(mapState, md)(ChatForm)
