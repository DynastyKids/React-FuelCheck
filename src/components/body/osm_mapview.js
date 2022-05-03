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

function contentText(getBounds, data) {
    var returnText = "Loading data ..."
    if (window.location.hash.length < 1) {
        returnText = `Please select a fuel type to viewing cheapest info in your mapview.`
    }
    const fuelName = [["U91", "E10", "P95", "P98", "DL", "PDL", "B20", "LPG", "LAF"], ["Unleaded 91", "Ethanol 10", "Premium Unleaded 95", "Premium Unleaded 98", "Diesel", "Premium Diesel", "BioDiesel", "LPG", "Low Aromatic Fuel"]]
    const { _northEast, _southWest } = getBounds;
    for (let index = 0; index < fuelName[0].length; index++) {
        if (window.location.hash.substring(1) === fuelName[0][index] && data.data !== undefined) {
            var brandselect = ""
            if (window.location.pathname === '/') {
                for (let index = 0; index < data.brands.length; index++)
                    brandselect = brandselect + "1" // By default adding all stations
            } else {
                brandselect = parseInt(window.location.pathname.replace("React-FuelCheck/", "").substring(1), 16).toString(2) + ""
                while (brandselect.length < data.brands.length) { brandselect = "0" + brandselect; }
            }

            // Checking website URLhash & Check loading array has "data" and "brandinfo"
            var cheapestElement = data.data[0][0];  // Initial default element
            cheapestElement[fuelName[0][index]] = 999 // Set initial price easy to beat

            for (let dataindex = 0; dataindex < data.data.length; dataindex++) {
                if (brandselect[dataindex] === 0 || brandselect[dataindex] === '0') // based on brandselect, if brand is not selected, skipped
                    continue
                
                data.data[dataindex].forEach(element => {
                    if (element.loc_lat < _northEast.lat && element.loc_lat > _southWest.lat && element.loc_lng > _southWest.lng && element.loc_lng < _northEast.lng) { // Check element geolocation in range
                        if (!isNaN(element[fuelName[0][index]]) && element[fuelName[0][index]] !==null && cheapestElement[fuelName[0][index]] > element[fuelName[0][index]]) { // Check if fuel price does exist & cheaper than last one
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
            returnText = `Cheapest ` + fuelName[1][index] + ` at ` + cheapestElement.name + `, Price:` + cheapestElement[fuelName[0][index]] + `, Address:` + cheapestAddr
            break;
        }
    }

    return returnText;
}

const Location = ({ map, data, status }) => {
    const [bounds, setBounds] = useState([])

    useEffect(() => {
        if (!map && status) return;

        const info = L.DomUtil.create('div', 'legend');

        const positon = L.Control.extend({
            options: { position: 'bottomleft' },

            onAdd: function () {
                info.innerHTML = contentText(map.getBounds(), data);
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