import logo from './oil.png';
import MainBody from './components/body/main';
import * as React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
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
      <Navbar bg="dark" expand="lg" variant='dark'>
        {/* <Container fluid> */}
          <Navbar.Brand href="#">
            <img alt="" src="/oil.png" width="30" height="30" className="d-inline-block align-top"/>{' '}
            Fuel Price Check
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex">
              <Nav.Link href="/U91">Unledaded 91</Nav.Link>
              <Nav.Link href="/E10">Unledaded 94 / E10</Nav.Link>
              <Nav.Link href="/P95">Premium 95</Nav.Link>
              <Nav.Link href="/P98">Premium 98</Nav.Link>
              <Nav.Link href="/DL">Diesel</Nav.Link>
              <Nav.Link href="/PDL">Premium Diesel</Nav.Link>
              <Nav.Link href="/LPG">LPG</Nav.Link>
              {/* <NavDropdown title="Option" id="basic-nav-dropdown">
                <NavDropdown.Item href="/U91">Unledaded 91</NavDropdown.Item>
                <NavDropdown.Item href="/U94">Unledaded 94 / E10</NavDropdown.Item>
                <NavDropdown.Item href="/U95">Unledaded 95</NavDropdown.Item>
                <NavDropdown.Item href="/U98">Unledaded 98</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/DL">Diesel</NavDropdown.Item>
                <NavDropdown.Item href="/PDL">Premium Diesel</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/LPG">LPG</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
      <MainBody Lat={lat} Lng={lng} Zoom={zoom}/>
    </div>
  );
}
