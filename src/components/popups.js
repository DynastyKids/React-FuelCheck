import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, Router} from 'react-router-dom'
import { Nav, NavDropdown, Button, Modal, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TerminalGatePrice() {
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

export function About() {
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
                    <br/>
                    <small>
                        Disclaimer: The information provided by React-FuelCheck ('we', 'us' or 'our') on this website is for general information purposes. All information are provided in good faith but not representation in any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information holding on this Site.
                    </small>
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

export function Selectbrand(prop) {
    const [show, setShow] = useState(false);
    const [redirectpath, setRedirectpath] = useState(null);
    const handleClose = (e) => {setShow(false)};
    const handleShow = (e) => setShow(true);
    const navigate = useNavigate();

    const OnFormSubmit = (e)=>{
        setShow(false);
        e.preventDefault();
        var brandopt=""
        console.log(e.target.form)
        for (let index = 0; index < prop.data.brands.length; index++) {
            if(e.target.form['brand'+index].checked){
                brandopt=brandopt+"1"
            }else{
                brandopt=brandopt+"0"
            }
        }
        let brandpath = parseInt(brandopt,2).toString(16);
        setRedirectpath(parseInt(brandopt,2).toString(16))
        console.log('/'+brandpath)
        navigate('/'+brandpath)
    };

    return (
        <>
            <Nav.Link href="#" onClick={handleShow}>Select Brand</Nav.Link>
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Set brand to display</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {prop.data.brands !== undefined ? prop.data.brands.map((row,index)=>(<Form.Check type="switch" label={row} key={index} id={'brand'+index} />)):<></>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={OnFormSubmit} type="submit">Confirm</Button>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal> 
        </>
    );
}

export function CheapStations() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Link href="#" onClick={handleShow}>Cheap Stations</Nav.Link>
            <Modal show={show} onHide={handleClose} size="xl" fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Cheap Stations on each state</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <iframe src="https://fuel.danisty8.com/cheaptable" title="CheapestFuel" frameBorder="0" style={{position: 'relative', height: '95%', width: '100%'}}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
