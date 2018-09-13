import React, {Component} from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            lat: !this.props.lat ? 49.2843154 : this.props.lat,
            long: !this.props.long ? -123.10605819999998 : this.props.long,
            nickname: this.props.nickname,
            users: this.props.users
        }
    }

    render() {

        const {lat, long, nickname, users} = this.state;
        var index = -1;
        console.log(this.state);
        return(
            <div>
                <Map 
                google={this.props.google} 
                zoom={15}
                style={{width:'50%', height:'100%'}}
                initialCenter={{
                    lat: lat,
                    lng: long
                }}
                >
                {users.map(user => {
                    index++;
                    return(
                        <Marker
                        key={index}
                        onClick = { this.onMarkerClick }
                        title = { users[index] }
                        position = {{ lat: user[index], lng: user[index] }}
                        name = { user[index] }
                        />
                    );
                })}
                    
                </Map>
            </div>
            
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDwqY5XKsIdy5lE70Hed92XNAsAOTe3AT0")
})(MapContainer)