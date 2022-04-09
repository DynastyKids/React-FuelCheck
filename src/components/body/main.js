import * as React from 'react';
import { useState, useEffect } from "react";
import OnGoogleMap from "./googlemap";
import OnOSMmap from './openstreetmap';

export default function MainBody(props) {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const getServoJson = async () => {
        try {
            const response = await fetch('https://fuel.danisty8.com/fuel');
            const json = await response.json();            
            setData(json);

            // // Merge data into one large array
            var mergedArray = []
            if (json.NSW) {
                json.NSW.forEach(element => {
                    mergedArray.push(element)
                });
            }
            if (json.TAS) {
                json.TAS.forEach(element => {
                    mergedArray.push(element)
                });
            }
            if (json.WA) {
                json.WA.forEach(element => {
                    mergedArray.push(element)
                });
            }
            if (json.NT) {
                json.NT.forEach(element => {
                    mergedArray.push(element)
                });
            }
            if (json.SA) {
                json.SA.forEach(element => {
                    mergedArray.push(element)
                });
            }
            if (json.QLD) {
                json.QLD.forEach(element => {
                    mergedArray.push(element)
                });
            }
            if (json.ACT) {
                json.ACT.forEach(element => {
                    mergedArray.push(element)
                });
            }
            if (json.VIC) {
                json.VIC.forEach(element => {
                    mergedArray.push(element)
                });
            }
            setData(mergedArray);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getServoJson()
    }, []);

    return (
        <>
            {/* <OnGoogleMap/> */}
            <OnOSMmap jsondata={data} status={isLoading} />
        </>
    );
}
