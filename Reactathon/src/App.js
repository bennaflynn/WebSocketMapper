import React, {Component} from 'react';

import {Route, Switch, BrowserRouter} from 'react-router-dom';
//components
import Messenger from './components/Messenger/Messenger';
import Nickname from './components/Nickname/Nickname';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            longitude: 0,
            latitude: 0
        }

        this.handleNicknameChange = this.handleNicknameChange.bind(this);

    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.geoSuccess);
    }
    //get the location of the computer
    geoSuccess =  (position) => {
        var startPos = position;
        this.setState({longitude: startPos.coords.longitude, latitude: startPos.coords.latitude});
    }

    handleNicknameChange(name) {
        this.setState({nickname: name});       
    }

    render() {
        return(
            <BrowserRouter>
            <Switch>
                <Route path="/Messenger" render={(props) => <Messenger {...props} nickname={this.state.nickname}  lat={this.state.latitude} long={this.state.longitude} exact />} />
                <Route path="/" render={(props) => <Nickname {...props} handleNicknameChange={this.handleNicknameChange} exact />} />
           
            </Switch>
            </BrowserRouter>
        );
    }
}
export default App;