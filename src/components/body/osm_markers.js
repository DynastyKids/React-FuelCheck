import * as React from 'react';
// import {useLocation} from "react-router-dom";
import { Marker, Popup, Tooltip } from 'react-leaflet'

import 'react-leaflet-markercluster/dist/styles.min.css';
import styles from "./osm_location-button.module.css";
import L from "leaflet";
import tileLayer from "./osm_tileLayer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function OsmMarkers(props) {
    const [data, setData] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const location = useLocation();

    useEffect(() => {// Hook to detect if window has been changed, then re-render filterData
        // filter the brand to be rendered
        filterDatas()
    }, [location]);

    const DisplayLineBreak = {
        whiteSpace: "pre-line"
    }

    const filterDatas = () => {
        var newdata = []
        if(props.data != undefined && !props.status){
        if (window.location.hash.length > 1 ) {
            // Set Fullname of fuel type
            const fuelName = [["U91", "E10", "P95", "P98", "DL", "PDL", "B20", "LPG", "DLS"], ["Unleaded 91", "Ethanol 10", "Premium Unleaded 95", "Premium Unleaded 98", "Diesel", "Premium Diesel", "BioDiesel", "LPG", "Diesel & Premium Diesel"]]
            var index = 0;
            for (index = 0; index < fuelName[0].length; index++) {
                if (window.location.hash.substring(1) === fuelName[0][index]) {
                    for (let brandindex = 0; brandindex < props.data.data.length; brandindex++) {
                        var brandselect=parseInt(window.location.pathname.substring(1),16).toString(2)+""
                        while(brandselect.length<props.data.data.length){ brandselect="0"+brandselect; } 
                        if(window.location.pathname.replace('/React-FuelCheck','')==='/'){
                            brandselect=""
                            for (let index = 0; index < props.data.data.length ; index++) {
                                brandselect=brandselect+"1" // By default adding all stations
                            }
                        }         
                        if (brandselect[brandindex] === '1') {
                        props.data.data[brandindex].forEach(element => {
                            if (element[window.location.hash.substring(1)] !== null && element[window.location.hash.substring(1)]) {
                                newdata.push({ "price1": element[window.location.hash.substring(1)], "address": element.address, "suburb": element.suburb, "state": element.state, "postcode": element.postcode, "brand": element.brand, "loc_lat": element.loc_lat, "loc_lng": element.loc_lng, "name": element.name, "priceInfo": fuelName[1][index] + ": " + element[window.location.hash.substring(1)] })
                            } else if (window.location.hash.substring(1) === "U91" && element["U91"]===null && element["LAF"] && element["LAF"] != null ){
                                // Adding Opal 91 into Unleaded 91 (For NT only)
                                newdata.push({ "price1": element["LAF"], "address": element.address, "suburb": element.suburb, "state": element.state, "postcode": element.postcode, "brand": element.brand, "loc_lat": element.loc_lat, "loc_lng": element.loc_lng, "name": element.name, "priceInfo": "Low Aromatic 91: " + element["LAF"] })
                            } else if(window.location.hash.substring(1) === "DLS"){
                                if (element["DL"]!==null && element["PDL"]!==null){
                                    let priceInfo="Diesel: " + element["DL"]+"\nPremium Diesel: "+element["PDL"]
                                    newdata.push({ "price1": element["DL"]+' / '+element["PDL"], "address": element.address, "suburb": element.suburb, "state": element.state, "postcode": element.postcode, "brand": element.brand, "loc_lat": element.loc_lat, "loc_lng": element.loc_lng, "name": element.name, "priceInfo":  priceInfo})
                                }else if(element["DL"]!==null){
                                    newdata.push({ "price1": element["DL"], "address": element.address, "suburb": element.suburb, "state": element.state, "postcode": element.postcode, "brand": element.brand, "loc_lat": element.loc_lat, "loc_lng": element.loc_lng, "name": element.name, "priceInfo": "Diesel: " + element["DL"] })
                                } else {
                                    newdata.push({ "price1": element["PDL"], "address": element.address, "suburb": element.suburb, "state": element.state, "postcode": element.postcode, "brand": element.brand, "loc_lat": element.loc_lat, "loc_lng": element.loc_lng, "name": element.name, "priceInfo": "Premium Diesel: " + element["PDL"] })
                                }
                            }
                        });
                    }
                    }
                }
            }
        } else {
            for (let brandindex = 0; brandindex < props.data.data.length; brandindex++) {
                var brandselect=parseInt(window.location.pathname.replace('/React-FuelCheck','').substring(1),16).toString(2)+""
                while(brandselect.length<props.data.data.length){ brandselect="0"+brandselect; } 
                if(window.location.pathname==='/'){
                    brandselect=""
                    for (let index = 0; index < props.data.data.length ; index++) {
                        brandselect=brandselect+"1" // By default adding all stations
                    }
                }
                if (brandselect[brandindex] === '1') {
                props.data.data[brandindex].forEach(element => {
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
                newdata.push({ "address": element.address, "suburb": element.suburb, "state": element.state, "postcode": element.postcode, "brand": element.brand, "loc_lat": element.loc_lat, "loc_lng": element.loc_lng, "name": element.name, "priceInfo": priceInfo })
                });
            }
            }
        }
    }
        setFilteredData(newdata)
    }

    window.addEventListener("hashchange", function () {
        filterDatas()
    });

    React.useEffect(() => {
        if (!props.status) {
            setData(props.data);
            filterDatas();
        }
    }, [props.status]);


    return (
        <>
            {filteredData.map(({ brand, name, loc_lat, loc_lng, address, suburb, state, postcode, priceInfo, price1 }, index) => ( 
                <Marker key={index} position={[loc_lat, loc_lng]} icon={getIcon(brand,30)}>
                    {window.location.hash.length > 1 ? <Tooltip direction="top" opacity={1} permanent>{price1}</Tooltip> : <></>}
                    <Popup><h5>{name}</h5>
                        <p><b>Address:</b> {address} {suburb != null && suburb ? ", " + suburb : ""} {state != null && state ? ", " + state : ""}{postcode != null && postcode ? " " + postcode : ""}</p>
                        <div style={DisplayLineBreak}>
                            {priceInfo}
                            <br />
                            <a href={"https://www.google.com/maps/search/?api=1&query=" + loc_lat.toString() + "," + loc_lng.toString()}>View in GoogleMap</a>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    )
}

function getIcon(brand, _size){
    var icon;
    if (brand.includes("Ampol")) {
        icon = L.icon({
            iconUrl: require('../../icons/ampol.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("BP")){
        icon = L.icon({
            iconUrl: require('../../icons/bp.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Budget")){
        icon = L.icon({
            iconUrl: require('../../icons/budget.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Woolworths")){
        icon = L.icon({
            iconUrl: require('../../icons/caltexwws.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Caltex")){
        icon = L.icon({
            iconUrl: require('../../icons/caltex.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Coles")){
        icon = L.icon({
            iconUrl: require('../../icons/colesexp.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Costco")){
        icon = L.icon({
            iconUrl: require('../../icons/costco.png'),
            iconSize: [_size*2]
        })
    } else if (brand.includes("Enhance")){
        icon = L.icon({
            iconUrl: require('../../icons/enhance.png'),
            iconSize: [_size]
        })
    }else if (brand.includes("Inland")){
        icon = L.icon({
            iconUrl: require('../../icons/inland.png'),
            iconSize: [_size*2]
        })
    } else if (brand.includes("Liberty")){
        icon = L.icon({
            iconUrl: require('../../icons/liberty.png'),
            iconSize: [_size*2]
        })
    } else if (brand.includes("Lowes")){
        icon = L.icon({
            iconUrl: require('../../icons/lowes.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Matilda")){
        icon = L.icon({
            iconUrl: require('../../icons/Matilda.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Metro")){
        icon = L.icon({
            iconUrl: require('../../icons/Metro.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Mobil")){
        icon = L.icon({
            iconUrl: require('../../icons/mobil.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("nrma")){
        icon = L.icon({
            iconUrl: require('../../icons/nrma.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Puma") || brand.includes("PUMA")){
        icon = L.icon({
            iconUrl: require('../../icons/puma.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("11") || brand.includes("Eleven")){
        icon = L.icon({
            iconUrl: require('../../icons/seven11.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Shell")){
        icon = L.icon({
            iconUrl: require('../../icons/Shell.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Speedway")){
        icon = L.icon({
            iconUrl: require('../../icons/speedway.png'),
            iconSize: [_size*2]
        })
    } else if (brand.includes("Tesla")){
        icon = L.icon({
            iconUrl: require('../../icons/Tesla.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("United")){
        icon = L.icon({
            iconUrl: require('../../icons/united.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("vibe")){
        icon = L.icon({
            iconUrl: require('../../icons/vibe.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("westside")){
        icon = L.icon({
            iconUrl: require('../../icons/westside.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("X Convenience")){
        icon = L.icon({
            iconUrl: require('../../icons/x.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("On the Run")){
        icon = L.icon({
            iconUrl: require('../../icons/otr.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Mogas")){
        icon = L.icon({
            iconUrl: require('../../icons/mogas.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("AM/PM")){
        icon = L.icon({
            iconUrl: require('../../icons/ampm.png'),
            iconSize: [_size*2]
        })
    } else {
        icon = L.icon({
            iconUrl: require('../../icons/gas.png'),
            iconSize: [_size]
        })
    } 
    
    return icon
}