import * as React from 'react';
// import {useLocation} from "react-router-dom";
import { MapContainer, Rectangle, TileLayer, useMap, useMapEvent, Marker, Popup, ScaleControl, Tooltip } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';

import 'react-leaflet-markercluster/dist/styles.min.css';
import styles from "./osm_location-button.module.css";
import L from "leaflet";
import tileLayer from "./osm_tileLayer";

export default function OnOSMmap(props) {
    const hashpram=window.location.hash;
    const [map, setMap] = React.useState(null);

    const [data, setData] = React.useState([]);
    const [filteredArray, setFilteredArray] = React.useState([]);

    React.useEffect(() => {
        setData(props.jsondata);
        setFilteredArray(DataBuilder(data))
    }, [props,window.location.hash]);

    const DisplayLineBreak = {
        whiteSpace: "pre-line"
    }

    return (
        <>
            <MapContainer center={[-28.0, 133.0]} zoom={5}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerClusterGroup>
                    {filteredArray.length > 0 ? filteredArray.map(({ brand, title, lat, lng, address, priceInfo,price1 }, index) => (
                        <Marker key={index} position={[lat, lng]}>
                            {hashpram.length > 0 ? <Tooltip direction="top" opacity={1} permanent>{price1}</Tooltip>:<></>}
                            <Popup><h5>{title}</h5>
                                <p><b>Addr:</b> {address}</p>
                                <div style={DisplayLineBreak}>
                                    {priceInfo}
                                </div>
                            </Popup>
                        </Marker>
                    )) : <></>}
                </MarkerClusterGroup>

                <LocationButton map={map} />
                <ScaleControl imperial={false} />
            </MapContainer>
        </>
    )
}


// Location Button
const LocationButton = () => {
    const map = useMap();

    React.useEffect(() => {
        // create custom button
        const customControl = L.Control.extend({
            // button position
            options: {
                position: "topleft",
                className: `${styles.locateButton} leaflet-bar`,
                html: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',
                style:
                    "width: 34px; height: 34px; left: 0; margin-top: 0; display: flex; cursor: pointer; justify-content: center; font-size: 2rem;",
            },

            // method
            onAdd: function (map) {
                this._map = map;
                const button = L.DomUtil.create("div");
                L.DomEvent.disableClickPropagation(button);

                button.title = "locate";
                button.innerHTML = this.options.html;
                button.className = this.options.className;
                button.setAttribute("style", this.options.style);

                L.DomEvent.on(button, "click", this._clicked, this);

                return button;
            },
            _clicked: function (e) {
                L.DomEvent.stopPropagation(e);

                this._checkLocate();

                return;
            },
            _checkLocate: function () {
                return this._locateMap();
            },

            _locateMap: function () {
                const locateActive = document.querySelector(`.${styles.locateButton}`);
                const locate = locateActive.classList.contains(styles.locateActive);
                // add/remove class from locate button
                locateActive.classList[locate ? "remove" : "add"](styles.locateActive);

                // remove class from button
                // and stop watching location
                if (locate) {
                    this.removeLocate();
                    this._map.stopLocate();
                    return;
                }

                // location on found
                this._map.on("locationfound", this.onLocationFound, this);
                // locataion on error
                this._map.on("locationerror", this.onLocationError, this);

                // start locate
                this._map.locate({ setView: true, enableHighAccuracy: true });
            },
            onLocationFound: function (e) {
                // add circle
                this.addCircle(e).addTo(this.featureGroup()).addTo(map);

                // add marker
                this.addMarker(e).addTo(this.featureGroup()).addTo(map);

                // add legend
            },
            // on location error
            onLocationError: function (e) {
                this.addLegend("Location access denied.");
            },
            // feature group
            featureGroup: function () {
                return new L.FeatureGroup();
            },
            // add legend
            addLegend: function (text) {
                const checkIfDescriotnExist = document.querySelector(".description");

                if (checkIfDescriotnExist) {
                    checkIfDescriotnExist.textContent = text;
                    return;
                }

                const legend = L.control({ position: "bottomleft" });

                legend.onAdd = function () {
                    let div = L.DomUtil.create("div", "description");
                    L.DomEvent.disableClickPropagation(div);
                    const textInfo = text;
                    div.insertAdjacentHTML("beforeend", textInfo);
                    return div;
                };
                legend.addTo(this._map);
            },
            addCircle: function ({ accuracy, latitude, longitude }) {
                return L.circle([latitude, longitude], accuracy / 2, {
                    className: "circle-test",
                    weight: 2,
                    stroke: false,
                    fillColor: "#136aec",
                    fillOpacity: 0.15,
                });
            },
            addMarker: function ({ latitude, longitude }) {
                return L.marker([latitude, longitude], {
                    icon: L.divIcon({
                        className: styles.locatedAnimation,
                        iconSize: L.point(17, 17),
                        popupAnchor: [0, -15],
                    }),
                }).bindPopup("Your are here :)");
            },
            removeLocate: function () {
                this._map.eachLayer(function (layer) {
                    if (layer instanceof L.Marker) {
                        const { icon } = layer.options;
                        if (icon?.options.className === styles.locatedAnimation) {
                            map.removeLayer(layer);
                        }
                    }
                    if (layer instanceof L.Circle) {
                        if (layer.options.className === "circle-test") {
                            map.removeLayer(layer);
                        }
                    }
                });
            },
        });

        // adding new button to map controll
        map.addControl(new customControl());
    }, [map]);

    return null;
};


function DataBuilder(props) {
    var dataArray = []
    props.forEach(element => {
        let pricetag = ''
        if (element.U91 !== null && element.U91) { pricetag += 'Unleaded 91: ' + element.U91 }
        if (element.E10 !== null && element.E10) { pricetag += '\nEthanol 10:' + element.E10 }
        if (element.P95 !== null && element.P95) { pricetag += '\nPremium Unleaded 95: ' + element.P95 }
        if (element.P98 !== null && element.P98) { pricetag += '\nPremium Unleaded 98: ' + element.P98 }
        pricetag += '\n';
        if (element.DL !== null && element.DL) { pricetag += '\nDiesel: ' + element.DL }
        if (element.PDL !== null && element.PDL) { pricetag += '\nPremium Diesel: ' + element.PDL }
        if (element.B20 !== null && element.B20) { pricetag += '\nBioDiesel 20: ' + element.B20 }
        pricetag += '\n'
        if (element.LPG !== null && element.LPG) { pricetag += '\nLPG: ' + element.LPG }
        dataArray.push({ brand: element.brand, title: element.name, lat: element.loc_lat, lng: element.loc_lng, address: element.address, priceInfo: pricetag, price1: (''+element.U91+element.E10+element.P95+element.P98+element.DL+element.PDL+ element.LPG).replaceAll('undefined', '') })
    });
    return (dataArray);
}

