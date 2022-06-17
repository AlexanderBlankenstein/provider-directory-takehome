import React, { Component, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProvider } from "./api";
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';


/**
 * A component that will call the API for the provider id that was passed in, 
 *  and generate a HTML list element to display.
 * @return <div> - element containing the Booking page
 */
 class Booking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            provider: []
        }
    }

    /**
    * When Mounted, call "API" to provide all details for the provider whos id was passed in, and save it to the state
    * Async call to wait until server responds. 
    * saves provider to state
    */
    async componentDidMount() {
        let provider = [];
        let errorResult = false;
        try {
            provider = await fetchProvider(this.props.providerid);
        } catch (error) {
            console.log("Error: " + error);
            errorResult = true;
        }
        
        this.setState({
            provider: provider,
            errorPersisted: errorResult
        })
    }

    /**
     * hook used for navigating back home when function is called
     */
    navigateHome() {
        this.props.navigate('/');
    }

    /**
     * Builds a string literal with the providers name and title. 
     * @return String - string with name and title or empty string if undefined
     */
    nameTextBuilder() {
        if (this.state.provider.name === undefined) {
            return "";            
        }
        return this.state.provider.name + ", " + this.state.provider.title
    }

    /**
     * Builds a string literal with the previous page name as well as providers name and title.
     *  used for navigating back to main page 
     * @return String - string with previous page and providers info
     */
    navTextBuilder() {
        return "Mental Wellness > " + this.nameTextBuilder();
    }


    /**
    * Checks to see if an avatar URL is given. 
    *  if blank then replaces with default
    * @param url - the avatar url to "check"
    * @return url - either defult avatar image or the one passed in
    */
    checkAvatarUrl(url) {
        if (url === "" || url == null) {
            return '/images/default_avatar.png';
        }
        return url;
    }

    /**
    * Handler to toggle the state when the user asks to book now.
    */
    showCalendarHandler = () => {
        this.props.setShowCalendar(!this.props.showCalendar);
    }

    /**
    * Handler to toggle states for showFullBio
    */
    showFullBioHandler = () => {
        this.props.setFullBio(!this.props.showFullBio);
    }

    /**
    * Return a provider's bio depending on length the user wishes for.  
    *  if blank then replaces with default
    * @return bio - a string that is either shortened or full lenth. 
    */
    getBio() { 
        if (this.state.provider.bio === undefined) {
            return "";
        }
        return this.props.showFullBio ? this.state.provider.bio : this.state.provider.bio.slice(0,200).concat("...");
    }

    /**
    * Extracts the Providers position from their Bio.
    * @return position - The position being "extracted".
    */
    getPosition() {
        let position = "";
        if (this.state.provider.bio === undefined) {
            return position;
        }
        //split bio after "is a" and remove all non Alpha characters or spaces, then split at every space
        let splitBio = this.state.provider.bio.split("is a");
        let bioWordsArray = splitBio[1].replace(/[^a-zA-Z0-9\s!?]+/g, '').split(" ");

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

    /**
    * builds string including list of all languages the provider speaks.
    * @return languages - The string being "built".
    */
    displayLanguages() {
        let languages = "";
        if (this.state.provider.languages === undefined) {
            return languages;
        }

        //if multiple languages, add a comma and add them to the string. 
        languages = this.state.provider.languages[0];
        for (let languageIndex = 1; languageIndex < this.state.provider.languages.length; languageIndex++) {
            languages += ", " + this.state.provider.languages[languageIndex];
        }
        return languages;
    }
     
    render() {
        return (
            <div className="booking-page">
                <div className='booking-content'>
                    <div className='header-nav'>
                        <div onClick={() => this.navigateHome()}>{this.navTextBuilder()}</div>
                    </div>
                    {this.props.showCalendar ? (
                                <div className='dropdown-menu calendar'>
                                    <div>
                                        <div className="dropdown-heading">Select Available Date</div>
                                        <Calendar onChange={this.props.onChange} value={this.props.value} />
                                    </div>
                                    <button className='book-btn select-btn' onClick={this.showCalendarHandler}>Book Selected Date</button>
                                </div>
                            ) : (
                                <div className="hidden"></div>
                            )}
                    {!this.state.errorPersisted ? (
                        <div className='booking-row'>
                            <div className='booking-left'>
                                <img className='avatar-img-square' src={this.checkAvatarUrl(this.state.provider.avatar)} alt={"avatar of provider"} />
                            </div>
                            <div className='booking-right'>
                                <div className='top'>
                                    <div className='provider-name'><strong>{this.nameTextBuilder()}</strong></div>
                                    <div>{this.getPosition()}</div>
                                    <p className='provider-bio'>{this.getBio()}</p>
                                    <button className='less-more-btn' onClick={this.showFullBioHandler}>Read {this.props.showFullBio ? "less ▲" : "more ▼"}</button>
                                </div>
                                <div className='bottom'>
                                    <div className='info-row'>
                                        <div className='info-left'>
                                            <img className='img' src='/images/location.png' alt={"location icon, a map with marker"} />
                                        </div>
                                        <div className='info-right'>
                                            <div>Location</div>
                                            <div><strong>{this.state.provider.location}</strong></div>
                                        </div>
                                    </div>
                                    <div className='info-row'>
                                        <div className='info-left'>
                                            <img className='img' src='/images/education.png' alt={"education icon, a grad hat"} />
                                        </div>
                                        <div className='info-right'>
                                            <div>Education</div>
                                            <div><strong>{this.state.provider.education}</strong></div>
                                        </div>
                                    </div>
                                    <div className='info-row'>
                                        <div className='info-left'>
                                            <img className='img' src='/images/language.png' alt={"language icon, a globe"} />
                                        </div>
                                        <div className='info-right'>
                                            <div>language</div>
                                            <div><strong>{this.displayLanguages()}</strong></div>
                                        </div>
                                    </div>
                                    <button className='book-btn' onClick={this.showCalendarHandler}>Book with us</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div><strong>410: Error Loading Provider: Please Return.</strong></div>
                    )}
                </div>
            </div>
        )
    }
}

/**
 * Add hooks to the component so that useNavigate and useParams can work.
 * @param Component - the component to add hooks to.
 * @return ComponentWithHook - the component with the Hooks added on.
 */
function addNavigateTo(Component) {
    function ComponentWithHook(props) {
        const navigate = useNavigate();
        const { providerid } = useParams();
        const [showFullBio, setFullBio] = useState(false);
        const [showCalendar, setShowCalendar] = useState(false);
        const [ value, onChange ] = useState(new Date());

        return <Component {...props} 
            navigate={navigate}
            providerid ={ providerid } 
            showFullBio={showFullBio} 
            setFullBio={setFullBio} 
            value={value} 
            onChange={onChange}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar} />;
    }
    return ComponentWithHook;
}

export default addNavigateTo(Booking);