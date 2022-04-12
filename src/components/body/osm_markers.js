import * as React from 'react';
// import {useLocation} from "react-router-dom";
import { MapContainer, Rectangle, TileLayer, useMap, useMapEvent, Marker, Popup, ScaleControl, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';

import 'react-leaflet-markercluster/dist/styles.min.css';
import styles from "./osm_location-button.module.css";
import L from "leaflet";
import tileLayer from "./osm_tileLayer";

export default function OsmMarkers(props) {
    const [data, setData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [cheapData, setCheapData] = React.useState([]);


    const DisplayLineBreak = {
        whiteSpace: "pre-line"
    }

    const filterDatas = () => {
        var newdata = []
        var cheap5 = []
        if (window.location.hash.length > 1) {
            // Set Fullname of fuel type
            const fuelName=[["U91","E10","P95","P98","DL","PDL","B20","LPG","LAF"],["Unleaded 91","Ethanol 10","Premium Unleaded 95","Premium Unleaded 98","Diesel","Premium Diesel","BioDiesel","LPG","Low Aromatic Fuel"]]
            var index=0;
            for (index = 0; index < fuelName[0].length; index++) {
                if (window.location.hash.substring(1) === fuelName[0][index]){
                    break;
                }
            }
            props.jsondata.forEach(element => {
                if (element[window.location.hash.substring(1)] !== null && element[window.location.hash.substring(1)]) {
                    newdata.push({ "price1": element[window.location.hash.substring(1)], "address": element.address,"suburb": element.suburb,"state": element.state,"postcode": element.postcode, "brand": element.brand, "loc_lat": element.loc_lat, "loc_lng": element.loc_lng, "name": element.name, "priceInfo": fuelName[1][index] + ": " + element[window.location.hash.substring(1)] })
                    cheap5.push(element[window.location.hash.substring(1)]*100)
                }
            });
            for (let index = 0; index < cheap5.length; index++) {
                if(isNaN(cheap5[index])){
                    console.log(index)
                } ;
            }
            

        } else {
            props.jsondata.forEach(element => {
                let priceInfo = ''
                if (element.U91 !== null && element.U91) { priceInfo += 'Unleaded 91: ' + element.U91 }
                if (element.LAF !== null && element.LAF) { priceInfo += 'Low Aromatic Fuel (Opal 91): ' + element.LAF }
                if (element.E10 !== null && element.E10) { priceInfo += '\nEthanol 94 (E10):' + element.E10 }
                if (element.P95 !== null && element.P95) { priceInfo += '\nPremium Unleaded 95: ' + element.P95 }
                if (element.P98 !== null && element.P98) { priceInfo += '\nPremium Unleaded 98: ' + element.P98 }
                priceInfo += '\n';
                if (element.DL !== null && element.DL) { priceInfo += '\nDiesel: ' + element.DL }
                if (element.PDL !== null && element.PDL) { priceInfo += '\nPremium Diesel: ' + element.PDL }
                if (element.B20 !== null && element.B20) { priceInfo += '\nBioDiesel 20: ' + element.B20 }
                priceInfo += '\n'
                if (element.LPG !== null && element.LPG) { priceInfo += '\nLPG: ' + element.LPG }
                newdata.push({ "address": element.address, "suburb": element.suburb,"state": element.state,"postcode": element.postcode,"brand": element.brand, "loc_lat": element.loc_lat, "loc_lng": element.loc_lng, "name": element.name, "priceInfo": priceInfo })
            });
        }
        setFilteredData(newdata)
    }

    window.addEventListener("hashchange", function () {
        // console.log("Data request for:" + window.location.hash)
        filterDatas()
    });

    React.useEffect(() => {
        if (!props.status) {
            setData(props.jsondata);
            filterDatas();
        }
    }, [props.status]);

    return (
        <>
            
            {filteredData.map(({ brand, name, loc_lat, loc_lng, address, suburb,state, postcode, priceInfo, price1 }, index) => (
                <Marker key={index} position={[loc_lat, loc_lng]}>
                    {window.location.hash.length > 1 ? <Tooltip direction="top" opacity={1} permanent>{price1}</Tooltip> : <></>}
                    <Popup><h5>{name}</h5>
                        <p><b>Address:</b> {address} {suburb!= null && suburb ? ", "+suburb : ""} {state!= null && state ? ", "+state : ""}{postcode!= null && postcode ? " "+postcode : ""}</p>
                        <div style={DisplayLineBreak}>
                            {priceInfo}
                            <br/>
                            <a href={"https://www.google.com/maps/search/?api=1&query="+loc_lat.toString()+","+loc_lng.toString()}>View in GoogleMap</a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}