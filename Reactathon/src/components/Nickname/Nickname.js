import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Nickname extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({nickname: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleNicknameChange(this.state.nickname);
    
        this.props.history.push('/Messenger');
    }

    render() {
        return(
            <div>
            <h1>Pick a nickname</h1>
            <form className='nicknameForm' onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} />
            </form>
            
        </div>
        );
        
    }
}

export default withRouter(Nickname);