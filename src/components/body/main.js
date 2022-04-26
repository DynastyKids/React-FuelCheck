import * as React from 'react';
import OnOSMmap from './openstreetmap';
import { Table } from 'react-bootstrap';

export default function MainBody(props) {

    return (
        <>
            {/* Adding Small Table banner to show cheapest stations info  / if fuel type selected, show in range top X cheapest */}
            <OnOSMmap jsondata={null} data={props.data} status={props.status} />
        </>
    );
}
