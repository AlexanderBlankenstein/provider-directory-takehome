import React from 'react'

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
    * Checks to see if a avatar URL is given. 
    *  if blank then replaces with default
    */
    function checkAvatarUrl() {
        //TODO: check if avatar url is available or blank

        //replace with default if non present.
        return './default_avatar.png'
    }

    //TODO: create function that scans through bio to find what profession they fall under.
    //  ie. registered social worker. this can be done by looking for the key words "is a".

    return (
        <div>
            <label>
                <img src={checkAvatarUrl()} alt={"avatar of provider"} />
                <div>{provider.name}, {provider.title}</div>
                <div>Registered Social Worker</div>
            </label>
            <p>{provider.bio}</p>
            <div>{provider.availabilty}</div>
        </div>
    )
}