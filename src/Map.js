import React, { Component } from 'react';
import { Map, GoogleApiWrapper, modal, Marker } from 'google-maps-react';
import { Button, Modal, ModalBody } from 'reactstrap';


const mapSize = {
  width: '100%',
  height: '100%'
};


export class GoogleMap extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { 
    marker: {},      
    selectedPlace: {} ,
    modal: false,
    lat: null,
    lng: null,
    coord: '',
    value: 'Rakib Hasan'
  };

  handleChange(event) {
    this.setState({ value: event.target.value});
  }

  markerClicked = (props, marker, e) => {
  // console.log(this.state.modal);
    this.setState(prevState => {
        return {
            selectedPlace: props,
            marker: marker,
            modal: !prevState.modal
        }
    });
}

//   closeWindow = props => {
//     if (this.state.modal) {
//       this.setState({
//         modal: false,
//         marker: null
//       });
//     }
//   };

   handleSubmit = event => {
    event.preventDefault();
    console.log(event.target.latlng.value);
    console.log(event.target.name.value);
    this.setState(prevState => {
    return {
      modal: !prevState.modal
    }});
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          coord: position.coords.latitude + ', ' + position.coords.longitude,
          error: null,
        });
      }
    );
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapSize}
        initialCenter={
          {
            lat: this.state.lat,
            lng: this.state.lng,
            // coord: this.state.lat + ', ' + this.state.lng
          }
        }
      >
        <Marker
          onClick={this.markerClicked}
        />
        <Modal isOpen={this.state.modal} toggle={this.markerClicked}>
        <ModalBody>


            <div>
            <form onSubmit={this.handleSubmit}>
              Coordinate: <input name="latlng" type="text" value={this.state.coord} onChange={this.handleChange}/><br/><br/>
              Name:<input name="name" type="text" value={this.state.value} onChange={this.handleChange}/>
              <br/><br/>
              <button type="submit" >Submit</button>
            </form>

          </div>
        </ModalBody>
      </Modal>
        
      </Map>
    );
  }

  
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDAEpYxpuSTEpfCXT-asLx0r1yEwMj1oRM'
})(GoogleMap);