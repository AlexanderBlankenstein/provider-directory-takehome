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

    /**
    * Extracts the Providers position from their Bio.
    * @return position - The position being "extracted".
    */
    function getPosition() {
        //split bio after "is a" and remove all non Alpha characters or spaces, then split at every space
        let splitBio = provider.bio.split("is a");
        let bioWordsArray = splitBio[1].replace(/[^a-zA-Z0-9\s!?]+/g, '').split(" ");
        let position = "";

        //for every word in the split array, save to output and search for worker or counsellor key words
        for (let wordIndex = 0; wordIndex < bioWordsArray.length; wordIndex++) {
            let word = bioWordsArray[wordIndex];
            position += (word + " ");
            
            if (word.toLowerCase() === "worker" || word.toLowerCase() === "counsellor") {
                wordIndex = bioWordsArray.length + 1; 
            }
        }
        return position;
    }

    return (
        <div className='provider-tile' onClick={() => {handleProviderClicked();}}>
            <div className='provider-split'>
                <img className='avatar-img' src={checkAvatarUrl(provider.avatar)} alt={"avatar of provider"} />
                <div className='provider-right'>
                    <div className='provider-Name'><strong>{provider.name}, {provider.title}</strong></div>
                    <div>{getPosition()}</div>
                </div>
            </div>
            <p className='provider-bio'>{provider.bio.slice(0,200).concat("...")}</p>
            <div className='provider-Availability'>Available {provider.availabilty}</div>
        </div>
    )
}
