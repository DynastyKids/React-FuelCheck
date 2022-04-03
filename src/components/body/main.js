import * as React from 'react';
import { useState, useEffect } from "react";
import L from "leaflet";
import PropTypes from "prop-types";
import OnGoogleMap from "./googlemap";
import OnOSMmap from './openstreetmap';

export default function MainBody(props){
    const pathname=window.location.pathname;
    console.log(pathname);

    const [map, setMap] = useState(null);

    if(pathname === "U91"){

    } else if(pathname === "U94"){

    } else if(pathname === "U95"){

    } else if(pathname === "U98"){

    } else if(pathname === "DL"){

    } else if(pathname === "PDL"){

    } else if(pathname === "LNG"){

    } else if(pathname === "ADB"){
        // Adblue only showing locations
    } else{
        // Path is not legal, use default prices
    }

    console.log(props)
    return (
        <>
            {/* <OnGoogleMap/> */}
            <OnOSMmap/>
        </>
    );
}

async function getNSWFuelData() {
    try {
      let response = await fetch('https://static.danisty8.com/fuel/NSWprice.json');
      let responseJson = await response.json();
      return responseJson.movies;
     } catch(error) {
      console.error(error);
    }
  }
