import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProvider } from "./api";
import './App.css';

/**
 * The Booking page to display more info on the given provier, 
 *  and generate a HTML element to display and allow for booking.
 * @return <div> element containing the Booking page
 */
 export default function Booking() {

    //used for navigating back home
    let navigate = useNavigate();

    //grabs the paramiter passed within URL. in this case an ID
    let { providerid } = useParams();

    async function getProviderInfo( id ) {
        let provider = await fetchProvider(id);
        return provider;
    }

    console.log(getProviderInfo(providerid));

    //TODO: error handling to ensure id is correct. 

    return (
        <div>
            <div onClick={() => {navigate('/');}}>Home -- Booking</div>
            <div>Hello World! ID: {providerid}</div>
        </div>
    )
}
