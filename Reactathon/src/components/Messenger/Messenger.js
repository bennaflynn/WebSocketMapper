import React, {Component} from 'react';
import './Messenger.css';

import {withRouter} from 'react-router-dom';

import io from 'socket.io-client';

class Messenger extends Component {
    constructor(props) {
        super(props);

        if(this.props.nickname == "") {
            this.props.history.push('/');
        }

        this.state = {
            message: "",
            messages: [],
            sent: false,
            socket: io('http://localhost:3030'),
            nickname: this.props.nickname
        }

        this.messageChange = this.messageChange.bind(this);
        this.messageSend = this.messageSend.bind(this);
    }

    

    componentDidMount() {
        const{ socket,nickname } = this.state;

        socket.on('connect', () => {
            socket.emit('chat message',nickname+ ' has connected');

            socket.on('chat message', (msg) => {
                this.appendToList(msg);
            })
        })
        
    }

    messageChange(e) {
        this.setState({message: e.target.value});
    }

    messageSend(e) {
        e.preventDefault();
        this.state.socket.emit('chat message', this.state.nickname + ": " + this.state.message);
        this.setState({message: "", sent: false});
    }

    appendToList(msg) {
        
       this.setState(prevState => ({
           messages: [...prevState.messages,msg]
       }))
        
    }

    render() {

        const {messages, message} = this.state;
        return(
            <div>
                <ul id="messages">
                {messages.map(msg => {
                    return(
                        <li>{msg}</li>
                    );
                })}
                </ul>
                <form action="">
                    <input id="m" value={message} autoComplete="off" onChange={this.messageChange} />
                    <button onClick={(e) => this.messageSend(e)}>Send</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Messenger);