import { useEffect, useState } from 'react';
import { MapContainer, Rectangle, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import tileLayer from "./osm_tileLayer";

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`.toString();
}

const SetRentacle = ({ bounds }) => {
    return bounds.map((bound, index) => (
        <Rectangle key={index} bounds={bound} color={getRandomColor()} weight={10} fillOpacity={0.1} />
    ));
}

function contentText(getBounds, jsondata) {
    var returnText = `Please select a fuel type to viewing cheapest info in your mapview.`
    const fuelName = [["U91", "E10", "P95", "P98", "DL", "PDL", "B20", "LPG", "LAF"], ["Unleaded 91", "Ethanol 10", "Premium Unleaded 95", "Premium Unleaded 98", "Diesel", "Premium Diesel", "BioDiesel", "LPG", "Low Aromatic Fuel"]]
    const { _northEast, _southWest } = getBounds;
    for (let index = 0; index < fuelName[0].length; index++) {
        if (window.location.hash.substring(1) === fuelName[0][index]) {
            var cheapestPrice=999;
            var cheapestAddr="";
            var cheapestName="";

            if(jsondata.length>0){
                jsondata.forEach(element => {
                    if (!isNaN(element[fuelName[0][index]]) && element[fuelName[0][index]] !==null && element[fuelName[0][index]] >0 && element[fuelName[0][index]] < cheapestPrice && element.loc_lat<_northEast.lat &&  element.loc_lat>_southWest.lat && element.loc_lng > _southWest.lng && element.loc_lng < _northEast.lng) {
                        cheapestPrice=element[fuelName[0][index]]
                        cheapestName=element.name
                        if(element.state === "NSW" || element.state === "TAS"){
                            cheapestAddr=element.address
                        }else if(element.state === "SA"){
                            cheapestAddr=element.address+`, `+element.state+`, `+element.postcode
                        }else{
                            cheapestAddr=element.address
                            if(element.suburb !== null){
                                cheapestAddr=cheapestAddr+`, `+element.suburb
                            }
                            cheapestAddr=cheapestAddr+`, `+element.state
                            if(element.postcode !== null){
                                cheapestAddr=cheapestAddr+` `+element.postcode
                            }
                        }
                    }
                });
                returnText = `Cheapest ` + fuelName[1][index] + ` at `+cheapestName+`, Price:`+cheapestPrice+`, Address:`+cheapestAddr
            }
            break;
        }
    }

    return returnText;
}

const Location = ({ map, jsondata,status }) => {
    const [bounds, setBounds] = useState([])

    useEffect(() => {
        if (!map && status) return;

        const info = L.DomUtil.create('div', 'legend');

        const positon = L.Control.extend({
            options: {
                position: 'bottomleft'
            },

            onAdd: function () {
                info.innerHTML = contentText(map.getBounds(),jsondata);
                return info;
            }
        })

        map.addControl(new positon());

        map.on('moveend zoomend', () => {
            const bounds = map.getBounds();
            info.textContent = contentText(bounds,jsondata);
            setBounds(b => [...b, bounds])
        });

    }, [map,status])

    return bounds?.length <= 0 ? <SetRentacle bounds={bounds} /> : null;
}

export default Location;