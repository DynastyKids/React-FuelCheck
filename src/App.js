import logo from './oil.png';
import { useState, useEffect } from "react";
import MainBody from './components/body/main';
import * as React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Modal, Table } from 'react-bootstrap';
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
                {/* <TerminalGatePrice /> */}
              </NavDropdown>
              <About/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <MainBody Lat={lat} Lng={lng} Zoom={zoom}/>
    </div>
  );
}

function TerminalGatePrice() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NavDropdown.Item href="#" onClick={handleShow}>Terminal Gate Price</NavDropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Terminal Gate Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
          </Table>

          Credit: Australian Institute of Petroleum(AIP)
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function About() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link href="#"  onClick={handleShow}>About</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is a fuel checker web App build by Dynastykids.<br/><br/>
          It's an open source project and currently available for checking Perth Metro, New South Wales and Tasmaina's fuel price. And seeking if there has any chance to accessing other states data and adding to this site.
          <br/><br/>
          <br/>New South Wales and Tasmania's data are provided by <a href="https://api.nsw.gov.au/">API.NSW</a>
          <br/>Western Australia's data are provided by <a href="https://www.fuelwatch.wa.gov.au/">FuelWatch</a>
          <br/><br/>
          Project Avaiable on: <a href="https://github.com/DynastyKids/React-FuelCheck">GitHub</a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}