import * as React from 'react';
import { useState, useEffect } from "react";
import OnGoogleMap from "./googlemap";
import OnOSMmap from './openstreetmap';

export default function MainBody(props){
    const pathname=window.location.pathname;
    // console.log(pathname);

    const [map, setMap] = useState(null);

    if(pathname === "U94"){
        const url="https://fuel.danisty8.com/E10";
    } else if(pathname === "U95"){
        const url="https://fuel.danisty8.com/P95";
    } else if(pathname === "U98"){
        const url="https://fuel.danisty8.com/P98";
    } else if(pathname === "DL"){
        const url="https://fuel.danisty8.com/DL";
    } else if(pathname === "PDL"){
        const url="https://fuel.danisty8.com/PDL";
    } else if(pathname === "LPG"){
        const url="https://fuel.danisty8.com/LPG";
    } else if(pathname === "ADB"){
        const url="https://fuel.danisty8.com/Adblue";
        // Adblue only showing locations
    } else{
        const url="https://fuel.danisty8.com/U91";
        // Path is not legal, use default U91
    }

    // console.log(props)
    return (
        <>
            {/* <OnGoogleMap/> */}
            <OnOSMmap/>
        </>
    );
}
