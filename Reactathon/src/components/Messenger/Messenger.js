import React, {Component} from 'react';
import './Messenger.css';

import {withRouter} from 'react-router-dom';
import MapContainer from '../Map/MapContainer';
import io from 'socket.io-client';

class Messenger extends Component {
    constructor(props) {
        super(props);

        if(this.props.nickname === "") {
            this.props.history.push('/');
        }


        this.state = {
            message: "",
            messages: [],
            sent: false,
            socket: io('http://localhost:3030'),
            nickname: this.props.nickname,
            users: [],
            loaded: false
        }

        this.messageChange = this.messageChange.bind(this);
        this.messageSend = this.messageSend.bind(this);
    }

    

    componentDidMount() {
        const{ socket,nickname } = this.state;

        socket.on('connect', () => {
            socket.emit('chat message',nickname+ ' has connected');

            socket.emit('new user', [nickname, this.props.long, this.props.lat ])

            socket.on('chat message', (msg) => {
                this.appendToList(msg);
            })

            socket.on('newUsers',(users) => {
               
                this.setState({loaded: true, users: users});
                
                
            })
        })
        
    }

    componentWillUnmount() {
        const {socket, nickname} = this.state;
        console.log("Dismounting");
        socket.on('disconnect', () => {
            socket.emit('disconnect', nickname);
        });
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

        const {messages, message, users, loaded} = this.state;
        return(
            <div className='grid-container'>
               
                <div className='messages'>
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
                
                <div className='map'>
                    {loaded && 
                     <MapContainer lat={this.props.lat} long={this.props.long} nickname={this.state.nickname} users={users}/>
                    }
                   
                </div>
            </div>
        );
    }
}

export default withRouter(Messenger);