import React from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';

/**
 * Display a given provider passed in by the provider list, and generate a HTML eleent to display.
 * @param provider - the provider to "display"
 * @return <div> element containing provider information to display
 */
export default function Provider({provider}) {

    let navigate = useNavigate();

    /**
    * Handle the click event if a user clicks on the given provider element.
    */
    function handleProviderClicked(){
        //grab provider ID and pass it onto a new react component.
        let location = './Booking/' + provider.id;
        navigate(location);
    }

    /**
    * Checks to see if an avatar URL is given. 
    *  if blank then replaces with default
    * @param url - the avatar url to "check"
    * @return url - either defult avatar image or the one passed in
    */
    function checkAvatarUrl(url) {
        if (url === "" || url == null) {
            return './images/default_avatar.png';
        }
        return url;
    }

    //TODO: create function that scans through bio to find what profession they fall under.
    //  ie. registered social worker. this can be done by looking for the key words "is a".

    return (
        <div className='provider-tile' onClick={() => {handleProviderClicked();}}>
            <div className='provider-split'>
                <img className='avatar-img' src={checkAvatarUrl(provider.avatar)} alt={"avatar of provider"} />
                <div className='provider-right'>
                    <div className='provider-Name'><strong>{provider.name}, {provider.title}</strong></div>
                    <div>Registered Social Worker</div>
                </div>
            </div>
            <p className='provider-Bio'>{provider.bio}</p>
            <div className='provider-Availability'>Available {provider.availabilty}</div>
        </div>
    )
}
