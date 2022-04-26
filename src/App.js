import logo from './oil.png';
import { useState, useEffect } from "react";
import MainBody from './components/body/main';
import * as React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Modal, Table, Form, FormCheck } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [lat, setLat] = React.useState(-28.00);
  const [lng, setLng] = React.useState(133.00);
  const [zoom, setZoom] = React.useState(4);
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const getServoJson = async () => {
    try {
      const response = await fetch('https://fuel.danisty8.com/fuel');
      const json = await response.json();
      setData(json);

      // // Merge data into one large array
      var mergedArray = []
      if (json.NSW) {
        json.NSW.forEach(element => {
          mergedArray.push(element)
        });
      }
      if (json.TAS) {
        json.TAS.forEach(element => {
          mergedArray.push(element)
        });
      }
      if (json.WA) {
        json.WA.forEach(element => {
          mergedArray.push(element)
        });
      }
      if (json.NT) {
        json.NT.forEach(element => {
          mergedArray.push(element)
        });
      }
      if (json.SA) {
        json.SA.forEach(element => {
          mergedArray.push(element)
        });
      }
      if (json.QLD) {
        json.QLD.forEach(element => {
          mergedArray.push(element)
        });
      }
      if (json.ACT) {
        json.ACT.forEach(element => {
          mergedArray.push(element)
        });
      }
      if (json.VIC) {
        json.VIC.forEach(element => {
          mergedArray.push(element)
        });
      }
      setData(mergedArray);
      var brands = []
      var reorderedData = []
      mergedArray.forEach(element => {
        const match = brands.find(brand => {
          if (brands.includes(element.brand)) {
            return true
          }
        })
        if (match === undefined) {
          brands.push(element.brand)
          reorderedData.push([element])
        } else {
          reorderedData[brands.indexOf(match)].push(element)
        }
      });
      console.log({ "brands": brands, "data": reorderedData })
      setData({ "brands": brands, "data": reorderedData })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getServoJson()
  }, []);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      setZoom(13);
    }, () => {
      // Not Receive the location info, use default
    })
  }

  return (
    <div className="App">
      <Navbar expand="lg" variant="light" bg="light" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{' '}
            Fuel Price Check
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-sm-0" style={{ maxHeight: '350px' }} navbarScroll>
              <NavDropdown title="Fuel option " id="basic-nav-dropdown">
                <NavDropdown.Item href="#U91">Unledaded 91</NavDropdown.Item>
                <NavDropdown.Item href="#LAF">Opal 91 / Low Aromatic Fuel</NavDropdown.Item>
                <NavDropdown.Item href="#E10">Ethanol 94 / E10</NavDropdown.Item>
                <NavDropdown.Item href="#P95">Premium 95</NavDropdown.Item>
                <NavDropdown.Item href="#P98">Premium 98</NavDropdown.Item>
                <NavDropdown.Item href="#DL">Diesel</NavDropdown.Item>
                <NavDropdown.Item href="#PDL">Premium Diesel</NavDropdown.Item>
                <NavDropdown.Item href="#LPG">LPG</NavDropdown.Item>
                <NavDropdown.Item href="/">Showing All</NavDropdown.Item>
                {/* <TerminalGatePrice /> */}
              </NavDropdown>
              <SelectBrand />
              <About />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <MainBody Lat={lat} Lng={lng} Zoom={zoom} data={data} status={isLoading} />
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
      <Nav.Link href="#" onClick={handleShow}>About</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is a fuel checker web App build by Dynastykids.<br /><br />
          It's an open source project and currently available for checking Perth Metro, New South Wales and Tasmaina's fuel price. And seeking if there has any chance to accessing other states data and adding to this site.
          <br /><br />
          <br />New South Wales and Tasmania's data are provided by <a href="https://api.nsw.gov.au/">API.NSW</a>
          <br />Western Australia's data are provided by <a href="https://www.fuelwatch.wa.gov.au/">FuelWatch</a>
          <br />North Territory's data are provided by <a href="https://myfuelnt.nt.gov.au/">MyFuel NT</a>
          <br /><br />
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

function SelectBrand() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link href="#" onClick={handleShow}>Select Brand</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Set brand to display</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Check type="checkbox" label="Brand 1" />
            <Form.Check type="checkbox" label="Brand 2" />
            <Form.Check type="checkbox" label="Brand 3" />
            <Form.Check type="checkbox" label="Brand 4" />
            <Form.Check type="checkbox" label="Brand 5" />
            <Form.Check type="checkbox" label="Brand 6" />
            <Form.Check type="checkbox" label="Brand 7" />
            <Form.Check type="checkbox" label="Brand 8" />
            <Form.Check type="checkbox" label="Brand 9" />
            <Form.Check type="checkbox" label="Brand 10" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose} type="submit">
              Confirm
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}