import * as React from 'react';
import { useState, useEffect } from "react";
import OnGoogleMap from "./googlemap";
import OnOSMmap from './openstreetmap';

export default function MainBody(props){
    const hashpram=window.location.hash;
    
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const getServoJson = async ()=>{
        try {
            const response = await fetch('https://fuel.danisty8.com/fuel');
            const json = await response.json();

            // Merge data into one large array
            var mergedArray = []
            json.NSW.forEach(element => {
                mergedArray.push(element)
            });
            json.TAS.forEach(element => {
                mergedArray.push(element)
            });
            json.WA.forEach(element => {
                mergedArray.push(element)
            });
            if(hashpram === "#U91"){
                var newElement = []
                mergedArray.forEach(element => {
                    if(element.U91 !== null){ newElement.push({"U91":element.U91,"address":element.address,"brand":element.brand,"loc_lat":element.loc_lat,"loc_lng":element.loc_lng,"name":element.name})}
                });
                setData(newElement);
            }else if(hashpram === "#E10"){
                var newElement = []
                mergedArray.forEach(element => {
                    if(element.E10 !== null){ newElement.push({"E10":element.E10,"address":element.address,"brand":element.brand,"loc_lat":element.loc_lat,"loc_lng":element.loc_lng,"name":element.name})}
                });
                setData(newElement);
            } else if(hashpram === "#P95"){
                var newElement = []
                mergedArray.forEach(element => {
                    if(element.P95 !== null){ newElement.push({"P95":element.P95,"address":element.address,"brand":element.brand,"loc_lat":element.loc_lat,"loc_lng":element.loc_lng,"name":element.name})}
                });
                setData(newElement);
            } else if(hashpram === "#P98"){
                var newElement = []
                mergedArray.forEach(element => {
                    if(element.P98 !== null){ newElement.push({"P98":element.P98,"address":element.address,"brand":element.brand,"loc_lat":element.loc_lat,"loc_lng":element.loc_lng,"name":element.name})}
                });
                setData(newElement);
            } else if(hashpram === "#DL"){
                var newElement = []
                mergedArray.forEach(element => {
                    if(element.DL !== null){ newElement.push({"DL":element.DL,"address":element.address,"brand":element.brand,"loc_lat":element.loc_lat,"loc_lng":element.loc_lng,"name":element.name})}
                });
                setData(newElement);
            } else if(hashpram === "#PDL"){
                var newElement = []
                mergedArray.forEach(element => {
                    if(element.PDL !== null){ newElement.push({"PDL":element.PDL,"address":element.address,"brand":element.brand,"loc_lat":element.loc_lat,"loc_lng":element.loc_lng,"name":element.name})}
                });
                setData(newElement);
            } else if(hashpram === "#LPG"){
                var newElement = []
                mergedArray.forEach(element => {
                    if(element.LPG !== null){ newElement.push({"LPG":element.LPG,"address":element.address,"brand":element.brand,"loc_lat":element.loc_lat,"loc_lng":element.loc_lng,"name":element.name})}
                });
                setData(newElement);
            } else if(hashpram === "#ADB"){
                // const url="https://fuel.danisty8.com/Adblue";
                // Adblue only showing locations
            } else {
                setData(mergedArray);
            }
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false);
        }
    }

    React.useEffect( ()=>{
        getServoJson();
        window.addEventListener("hashchange", getServoJson());
    },[]);

    return (
        <>
            {/* <OnGoogleMap/> */}
            <OnOSMmap jsondata={data.length!==0 ? data:[]}/>
        </>
    );
}
