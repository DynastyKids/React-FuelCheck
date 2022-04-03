import logo from './oil.png';
import MainBody from './components/body/main';
import * as React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container  } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [lat, setLat] = React.useState(-28.00);
  const [lng, setLng] = React.useState(133.00);
  const [zoom, setZoom] = React.useState(4);

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) =>{
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      setZoom(13);
      
    },()=>{
      // Not Receive the location info, use default
    })
  }
  // console.log(lat,lng,zoom)
  
  return (
    <div className="App">
      <Navbar expand="lg" variant="light" bg="light" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>{' '}
            Fuel Price Check
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-sm-0" style={{ maxHeight: '350px' }} navbarScroll>
              <NavDropdown title="Fuel option (Not available at moment)" id="basic-nav-dropdown">
                <NavDropdown.Item href="#U91">Unledaded 91</NavDropdown.Item>
                <NavDropdown.Item href="#E10">Unledaded 94 / E10</NavDropdown.Item>
                <NavDropdown.Item href="#P95">Premium 95</NavDropdown.Item>
                <NavDropdown.Item href="#P98">Premium 98</NavDropdown.Item>
                <NavDropdown.Item href="#DL">Diesel</NavDropdown.Item>
                <NavDropdown.Item href="#PDL">Premium Diesel</NavDropdown.Item>
                <NavDropdown.Item href="#LPG">LPG</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <MainBody Lat={lat} Lng={lng} Zoom={zoom}/>
    </div>
  );
}
