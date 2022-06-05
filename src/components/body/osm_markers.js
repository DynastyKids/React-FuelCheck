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
    const [fueltype, setFueltype] = React.useState(props.userfuel);
    const location = useLocation();

    useEffect(() => {// Hook to detect if window has been changed, then re-render filterData
        // filter the brand to be rendered
        setFueltype(props.userfuel);
        filterDatas()
    }, [location,props.userfuel]);

    const DisplayLineBreak = {
        whiteSpace: "pre-line"
    }

    const filterDatas = () => {
        var newdata = []
        const fuelName = [["U91", "E10", "P95", "P98","P9X","E91", "DL", "PDL", "B20", "LPG", "DLS","All"], ["Unleaded 91", "Ethanol 10", "Premium Unleaded 95", "Premium Unleaded 98", "Premium 95 & 98","Unleaded 91-E10", "Diesel", "Premium Diesel", "BioDiesel", "LPG", "Diesel & Premium Diesel","All"]]// Set Fullname of fuel type
        // Checking for parameters
        var params=[]
        const selectedfuel=(element) => element === props.userfuel;
        var selectedbrand=""
        if(window.location.search.length>1){
            params= window.location.search.substring(1).split('&');
            for(var i=0;i<params.length;i++){
                if(params[i].substring(0,1) === "b"){
                    selectedbrand=params[i].substring(2);
                }
            }
            
            if(selectedbrand.length>0 && props.data !== undefined && !props.status){
                selectedbrand = parseInt(selectedbrand, 16).toString(2)
                while (selectedbrand.length < props.data.data.length) { 
                    selectedbrand = "0" + String(selectedbrand); 
                }
            }
        }

        if (props.data !== undefined && !props.status) {
            // Props.data -> Brands+fuel price
            // console.log(props) // Users Choosed fuel type
            for(let brandid=0;brandid<props.data.data.length;brandid++){
                // 增加if语句，如果有选品牌但是没选中则跳过(非0000记为1111)
                if(selectedbrand[brandid] === '0'){
                    continue;
                }
                // Each Brands station
                props.data.data[brandid].forEach(eachstation =>{
                    //如果选择了油品，则检测站点是否有对应油品，如果有则加入array，没有则跳过
                    if(props.userfuel==="All"){
                        //Adding all stations
                        let priceInfo = ''
                        if (eachstation.U91 !== null) { priceInfo += 'Unleaded 91: ' + eachstation.U91 }
                        if (eachstation.LAF !== null && eachstation.LAF) { priceInfo += 'Low Aromatic Fuel (Opal 91): ' + eachstation.LAF }
                        if (eachstation.E10 !== null) { priceInfo += '\nEthanol 94 (E10):' + eachstation.E10 }
                        if (eachstation.P95 !== null) { priceInfo += '\nPremium Unleaded 95: ' + eachstation.P95 }
                        if (eachstation.P98 !== null) { priceInfo += '\nPremium Unleaded 98: ' + eachstation.P98 }
                        priceInfo += '\n';
                        if (eachstation.DL !== null) { priceInfo += '\nDiesel: ' + eachstation.DL }
                        if (eachstation.PDL !== null) { priceInfo += '\nPremium Diesel: ' + eachstation.PDL }
                        if (eachstation.B20 !== null && eachstation.B20) { priceInfo += '\nBioDiesel 20: ' + eachstation.B20 }
                        if (eachstation.LPG !== null) { priceInfo += '\n\nLPG: ' + eachstation.LPG }
                        newdata.push({ price1:null,"address": eachstation.address, "suburb": eachstation.suburb, "state": eachstation.state, "postcode": eachstation.postcode, "brand": eachstation.brand, "loc_lat": eachstation.loc_lat, "loc_lng": eachstation.loc_lng, "name": eachstation.name, "priceInfo": priceInfo })
                    } else if(eachstation.state === "NT" && props.userfuel === "U91" && eachstation["U91"] === null && eachstation["LAF"] !== null){
                        newdata.push({ "price1": eachstation["LAF"], "address": eachstation.address, "suburb": eachstation.suburb, "state": eachstation.state, "postcode": eachstation.postcode, "brand": eachstation.brand, "loc_lat": eachstation.loc_lat, "loc_lng": eachstation.loc_lng, "name": eachstation.name, "priceInfo": "Low Aromatic 91: " + eachstation["LAF"] })
                    }else if (props.userfuel === "E91" && eachstation["U91"] !== null && eachstation["E10"] !== null){
                        var priceInfo=""
                        var pricetag = ""
                        if(eachstation["E10"] !== null){
                            priceInfo = "E10: " + eachstation["E10"]
                            pricetag=eachstation["E10"]
                        }
                        if(eachstation["U91"] !== null){
                            priceInfo = "Unloaded 91: " + eachstation["U91"]+"\n"+priceInfo
                            pricetag=eachstation["U91"]
                        }
                        newdata.push({ "price1": pricetag, "address": eachstation.address, "suburb": eachstation.suburb, "state": eachstation.state, "postcode": eachstation.postcode, "brand": eachstation.brand, "loc_lat": eachstation.loc_lat, "loc_lng": eachstation.loc_lng, "name": eachstation.name, "priceInfo": priceInfo })
                    }else if (props.userfuel === "P9X" && eachstation["P98"] !== null && eachstation["P95"] !== null) {
                        var priceInfo=""
                        var pricetag = ""
                        if(eachstation["P98"] !== null){
                            priceInfo = "Premium Unloaded 98: " + eachstation["P98"]
                            pricetag=eachstation["P98"]
                        }
                        if(eachstation["P95"] !== null){
                            priceInfo = "Premium Unloaded 95: " + eachstation["P95"]+"\n"+priceInfo
                            pricetag=eachstation["P95"]
                        }
                        newdata.push({ "price1": pricetag, "address": eachstation.address, "suburb": eachstation.suburb, "state": eachstation.state, "postcode": eachstation.postcode, "brand": eachstation.brand, "loc_lat": eachstation.loc_lat, "loc_lng": eachstation.loc_lng, "name": eachstation.name, "priceInfo": priceInfo })
                    }else if (props.userfuel === "DLS" && eachstation["PDL"] !== null && eachstation["DL"] !== null) {
                        var priceInfo=""
                        var pricetag = ""
                        if(eachstation["PDL"] !== null && eachstation["PDL"]){
                            priceInfo = "Premium: " + eachstation["PDL"]
                            pricetag=eachstation["PDL"]
                        }
                        if(eachstation["DL"] !== null && eachstation["DL"]){
                            priceInfo = "Diesel: " + eachstation["DL"]+"\n"+priceInfo
                            pricetag=eachstation["DL"]
                        }
                        newdata.push({ "price1": pricetag, "address": eachstation.address, "suburb": eachstation.suburb, "state": eachstation.state, "postcode": eachstation.postcode, "brand": eachstation.brand, "loc_lat": eachstation.loc_lat, "loc_lng": eachstation.loc_lng, "name": eachstation.name, "priceInfo": priceInfo })
                    }else if(eachstation[props.userfuel] !== null && eachstation[props.userfuel]){
                        // Adding selected fuel only
                        newdata.push({ "price1": eachstation[props.userfuel], "address": eachstation.address, "suburb": eachstation.suburb, "state": eachstation.state, "postcode": eachstation.postcode, "brand": eachstation.brand, "loc_lat": eachstation.loc_lat, "loc_lng": eachstation.loc_lng, "name": eachstation.name, "priceInfo": fuelName[1][fuelName[0].findIndex(selectedfuel)] + ": " + eachstation[props.userfuel] })
                    }
                });
                // Using Regex to find brand infos
            }
        }
        setFilteredData(newdata)
    }

    window.addEventListener("locationchange", function () {
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
                <Marker key={index} position={[loc_lat, loc_lng]} icon={getIcon(brand, 30)}>
                    {price1 !== null? <Tooltip direction="top" opacity={1} permanent>{price1}</Tooltip> : <></>}
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

function getIcon(brand, _size) {
    var icon;
    if (brand.includes("Ampol")) {
        icon = L.icon({
            iconUrl: require('../../icons/ampol.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("BP")) {
        icon = L.icon({
            iconUrl: require('../../icons/bp.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Budget")) {
        icon = L.icon({
            iconUrl: require('../../icons/budget.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Woolworths")) {
        icon = L.icon({
            iconUrl: require('../../icons/caltexwws.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Caltex")) {
        icon = L.icon({
            iconUrl: require('../../icons/caltex.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Coles")) {
        icon = L.icon({
            iconUrl: require('../../icons/colesexp.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Costco")) {
        icon = L.icon({
            iconUrl: require('../../icons/costco.png'),
            iconSize: [_size * 2]
        })
    } else if (brand.includes("Enhance")) {
        icon = L.icon({
            iconUrl: require('../../icons/enhance.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Inland")) {
        icon = L.icon({
            iconUrl: require('../../icons/inland.png'),
            iconSize: [_size * 2]
        })
    } else if (brand.includes("Liberty")) {
        icon = L.icon({
            iconUrl: require('../../icons/liberty.png'),
            iconSize: [_size * 2]
        })
    } else if (brand.includes("Lowes")) {
        icon = L.icon({
            iconUrl: require('../../icons/lowes.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Matilda")) {
        icon = L.icon({
            iconUrl: require('../../icons/Matilda.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Metro")) {
        icon = L.icon({
            iconUrl: require('../../icons/Metro.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Mobil")) {
        icon = L.icon({
            iconUrl: require('../../icons/mobil.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("nrma")) {
        icon = L.icon({
            iconUrl: require('../../icons/nrma.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Puma") || brand.includes("PUMA")) {
        icon = L.icon({
            iconUrl: require('../../icons/puma.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("11") || brand.includes("Eleven")) {
        icon = L.icon({
            iconUrl: require('../../icons/seven11.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Shell")) {
        icon = L.icon({
            iconUrl: require('../../icons/Shell.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Speedway")) {
        icon = L.icon({
            iconUrl: require('../../icons/speedway.png'),
            iconSize: [_size * 2]
        })
    } else if (brand.includes("Tesla")) {
        icon = L.icon({
            iconUrl: require('../../icons/Tesla.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("United")) {
        icon = L.icon({
            iconUrl: require('../../icons/united.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("vibe")) {
        icon = L.icon({
            iconUrl: require('../../icons/vibe.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("westside")) {
        icon = L.icon({
            iconUrl: require('../../icons/westside.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("X Convenience")) {
        icon = L.icon({
            iconUrl: require('../../icons/x.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("On the Run")) {
        icon = L.icon({
            iconUrl: require('../../icons/otr.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("Mogas")) {
        icon = L.icon({
            iconUrl: require('../../icons/mogas.png'),
            iconSize: [_size]
        })
    } else if (brand.includes("AM/PM")) {
        icon = L.icon({
            iconUrl: require('../../icons/ampm.png'),
            iconSize: [_size * 2]
        })
    } else {
        icon = L.icon({
            iconUrl: require('../../icons/gas.png'),
            iconSize: [_size]
        })
    }

    return icon
}