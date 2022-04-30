import { useState } from "react";
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
    console.log(prop.data)
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
                        {prop.data.brands !== undefined ? prop.data.brands.map((row,index)=>(<Form.Check type="checkbox" label={row} key={index} />)):<></>}
                        <Form.Check type="checkbox" label="Brand 1" />
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

export function CheapStations(prop) {
    const [show, setShow] = useState(false);
    console.log(prop)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Link href="#" onClick={handleShow}>Cheap Stations</Nav.Link>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cheap 5 Stations on each station</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>QLD</h5>
                    <h5>NSW</h5>
                    <h5>ACT (7-11 Only)</h5>
                    <h5>VIC (7-11 Only)</h5>
                    <h5>NT</h5>
                    <h5>SA</h5>
                    <h5>TAS</h5>
                    <h5>WA</h5>
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

function bubblesortPrice(data, fueltype) {
    const sortType = fueltype
    const sortdata = data

}