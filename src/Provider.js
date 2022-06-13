import React from 'react'
import './App.css';

/**
 * Display a given provider passed in by the provider list, and generate a HTML eleent to display.
 * @param provider - the provider to "display"
 * @return <div> element containing provider information to display
 */
export default function Provider({provider}) {

    /**
    * Handle the click event if a user clicks on the given provider element.
    */
    function handleProviderClick(){
        console.log("provider clicked");
        //TODO: grab provider ID and pass it onto a new react component.
    }

    /**
    * Checks to see if an avatar URL is given. 
    *  if blank then replaces with default
    * @param url - the avatar url to "check"
    * @return url - either defult avatar image or the one passed in
    */
    function checkAvatarUrl(url) {
        if (url === "" || url == null) {
            return './default_avatar.png';
        }
        return url;
    }

    //TODO: create function that scans through bio to find what profession they fall under.
    //  ie. registered social worker. this can be done by looking for the key words "is a".

    return (
        <div className='Provider-tile'>
            <div className='Provider-heading'>
                <img className='Avatar-img' src={checkAvatarUrl(provider.avatar)} alt={"avatar of provider"} />
                <div className='Provider-right'>
                    <div className='Provider-Name'><strong>{provider.name}, {provider.title}</strong></div>
                    <div>Registered Social Worker</div>
                </div>
            </div>
            <p className='Provider-Bio'>{provider.bio}</p>
            <div className='Provider-Availability'>Available {provider.availabilty}</div>
        </div>
    )
}
