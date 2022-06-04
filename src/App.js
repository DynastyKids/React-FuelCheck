import logo from './oil.png';
import MainBody from './components/body/main';
import * as React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { About, Selectbrand, CheapStations } from '../src/components/popups'

export default function App() {
    const [lat, setLat] = React.useState(-28.00);
    const [lng, setLng] = React.useState(133.00);
    const [zoom, setZoom] = React.useState(4);
    const [data, setData] = React.useState([]);
    const [rawdata, setRawdata] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);

    const getServoJson = async () => {
        try {
            const response = await fetch('https://fuel.danisty8.com/fuel');
            const json = await response.json();
            setRawdata(json);

            // Merge data into one large array
            var mergedArray = []
            var statelist = ['QLD', 'NSW', 'VIC', 'ACT', 'TAS', 'NT', 'SA', 'WA']
            statelist.forEach(eachstate => {
                if (json[eachstate]) {
                    json[eachstate].forEach(element => {
                        mergedArray.push(element)
                    });
                }
            });

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
                    reorderedData.push([])
                }
                reorderedData[brands.indexOf(element.brand)].push(element)
            });
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

    const fuelName = [["U91", "E10", "P95", "P98", "DL", "PDL", "B20", "LPG", "DLS","All"], ["Unleaded 91", "Ethanol 10", "Premium Unleaded 95", "Premium Unleaded 98", "Diesel", "Premium Diesel", "BioDiesel", "LPG", "Diesel & Premium Diesel","All"]]
    const [fueltype,setFueltype] = React.useState('All');
    const handleFueltype = (e) =>{
        setFueltype(e);
        console.log("Changing to:"+e);
    }
    const selectedfuel=(element) => element === fueltype;
    
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
                        <Nav.Link>Showing: {fuelName[1][fuelName[0].findIndex(selectedfuel)]}</Nav.Link>
                            <NavDropdown title="Fuel Type" id="basic-nav-dropdown" onSelect={handleFueltype}>
                                <NavDropdown.Item eventKey="U91">Unledaded 91 / Opal 91 (NT Only)</NavDropdown.Item>
                                <NavDropdown.Item eventKey="E10">Ethanol 94 / E10</NavDropdown.Item>
                                <NavDropdown.Item eventKey="P95">Premium 95</NavDropdown.Item>
                                <NavDropdown.Item eventKey="P98">Premium 98</NavDropdown.Item>
                                <NavDropdown.Item eventKey="P9X">Premium 95 / 98</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="DL">Diesel</NavDropdown.Item>
                                <NavDropdown.Item eventKey="PDL">Premium Diesel</NavDropdown.Item>
                                <NavDropdown.Item eventKey="DLS">Diesel + Premium Diesel </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="LPG">LPG</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="All">Showing All</NavDropdown.Item>
                            </NavDropdown>
                            <CheapStations />
                            {data ? <Selectbrand data={data}/> : <></>}
                            {/* <TerminalGatePrice /> */}
                            <About />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <MainBody Lat={lat} Lng={lng} Zoom={zoom} data={data} rawdata={rawdata} status={isLoading} userfuel={fueltype}/>
        </div>
    );
}
