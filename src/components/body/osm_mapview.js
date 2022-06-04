import { useEffect, useState } from 'react';
import { MapContainer, Rectangle, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import tileLayer from "./osm_tileLayer";

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`.toString();
}

const SetRentacle = ({ bounds }) => {
    return bounds.map((bound, index) => (
        <Rectangle key={index} bounds={bound} color={getRandomColor()} weight={15} fillOpacity={0.8} />
    ));
}

function contentText(getBounds, data,userfuel) {
    var returnText = ""
    if (userfuel === "All") {
        return `Please select a fuel type to viewing cheapest info in your mapview.`
    }
    const fuelName = [["U91", "E10", "P95", "P98","P9X", "DL", "PDL", "B20", "LPG", "DLS"], ["Unleaded 91", "Ethanol 10", "Premium Unleaded 95", "Premium Unleaded 98", "Premium Unleaded 95 or 98", "Diesel", "Premium Diesel", "BioDiesel", "LPG", "Diesel & Premium Diesel"]]
    const { _northEast, _southWest } = getBounds;
    for (let index = 0; index < fuelName[0].length; index++) {
        if (userfuel !== "All" && data.data !== undefined) {
            var brandselect = "";
            console.log(window.location.search);

            if(window.location.search.length>1){
                var params= window.location.search.substring(1).split('&');
                for(var i=0;i<params.length;i++){
                    if(params[i].substring(0,1) === "b"){
                        brandselect=params[i].substring(2);
                    }
                }
                
                if(brandselect.length>0){
                    brandselect = parseInt(brandselect, 16).toString(2)
                    while (brandselect.length < data.data.length) { 
                        brandselect = "0" + String(brandselect); 
                    }
                }
            }
            // Checking website URLhash & Check loading array has "data" and "brandinfo"
            var cheapestElement = data.data[0][0];  // Initial default element
            cheapestElement[fuelName[0][index]] = 999 // Set initial price easy to beat

            for (let dataindex = 0; dataindex < data.data.length; dataindex++) {
                if (brandselect[dataindex] === 0 || brandselect[dataindex] === '0') // based on brandselect, if brand is not selected, skipped
                    continue
                
                data.data[dataindex].forEach(element => {
                    if (element.loc_lat < _northEast.lat && element.loc_lat > _southWest.lat && element.loc_lng > _southWest.lng && element.loc_lng < _northEast.lng) { // Check element geolocation in range
                        if(userfuel == "U91" && element.state=="NT" ){ // NT using LAF replace Unleaded 91
                            if(element.LAF && cheapestElement[fuelName[0][index]] >element.LAF){
                                cheapestElement = element
                                cheapestElement[fuelName[0][index]]=element.LAF
                            }
                        } else if(userfuel === "P9X"){ // User is selecting P95+P98
                            if(element.P95 && element.P95!==null && cheapestElement[fuelName[0][index]] >element.P95){
                                cheapestElement = element
                                cheapestElement[fuelName[0][index]]=element.P95
                            }
                            if(element.P98 && element.P98!==null && cheapestElement[fuelName[0][index]] >element.P98){
                                cheapestElement = element
                                cheapestElement[fuelName[0][index]]=element.P98
                            }
                        } else if(userfuel === "DLS"){ // User is selecting DL+PDL
                            if(element.DL && element.DL!==null && cheapestElement[fuelName[0][index]] >element.DL){
                                cheapestElement = element
                                cheapestElement[fuelName[0][index]]=element.DL
                            }
                            if(element.PDL && element.PDL!==null && cheapestElement[fuelName[0][index]] >element.PDL){
                                cheapestElement = element
                                cheapestElement[fuelName[0][index]]=element.PDL
                            }
                        } else if (!isNaN(element[fuelName[0][index]]) && element[fuelName[0][index]] !==null && cheapestElement[fuelName[0][index]] > element[fuelName[0][index]]) { // Check if fuel price does exist & cheaper than last one
                            cheapestElement = element
                        } 
                    }
                });
            }

            // Building full address based on records
            var cheapestAddr = cheapestElement.address
            if (cheapestElement.state !== "NSW" && cheapestElement.state !== "TAS") {
                if (cheapestElement.suburb !== null) {
                    cheapestAddr = cheapestAddr + `, ` + cheapestElement.suburb
                }
                cheapestAddr = cheapestAddr + `, ` + cheapestElement.state
                if (cheapestElement.postcode !== null) {
                    cheapestAddr = cheapestAddr + ` ` + cheapestElement.postcode
                }
            }
            returnText = `Cheapest price:` + cheapestElement[fuelName[0][index]] + ` by ` + cheapestElement.name + `, at:` + cheapestAddr
            break;
        }
    }

    return returnText;
}

const Location = ({ map, data, status, userfuel}) => {
    const [bounds, setBounds] = useState([])

    useEffect(() => {
        if (!map && status) return;
        if (userfuel=="All") return;

        const info = L.DomUtil.create('div', 'legend');

        const positon = L.Control.extend({
            options: { position: 'bottomleft' },

            onAdd: function () {
                info.innerHTML = contentText(map.getBounds(), data,userfuel);
                return info;
            }
        })

        map.addControl(new positon());

        map.on('moveend zoomend', () => {
            const bounds = map.getBounds();
            info.textContent = contentText(bounds, data);
            setBounds(b => [...b, bounds])
        });

    }, [map, status])

    return bounds?.length <= 0 ? <SetRentacle bounds={bounds} /> : null;
}

export default Location;