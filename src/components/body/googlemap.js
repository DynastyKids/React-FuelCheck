// Reference of developing with Google Map: https://github.com/google-map-react/google-map-react
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class OnGoogleMap extends Component {
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
      <div style={{ height: '98vh', width: '100%' }}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: Keys.GoogleMapKey }}
          bootstrapURLKeys={{ key: "AIzaSyCz7l67ELz0j2O98TkWHrn4a5W-JrZ2RgU" }}
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