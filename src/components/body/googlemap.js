// Reference of developing with Google Map: https://github.com/google-map-react/google-map-react
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import GoogleMapKey from './../key.json';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class onGoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GoogleMapKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}