import React, { Component, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProvider } from "./api";
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

    //TODO: error handling to ensure id passed in is correct.

    /**
    * When Mounted, call "API" to provide all details for the provider whos id was passed in, and save it to the state
    * Async call to wait until server responds. 
    * saves provider to state
    */
    async componentDidMount() {
        const provider = await fetchProvider(this.props.providerid);
        this.setState({
            provider: provider
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

    showFullBioHandler = () => {
        this.props.setFullBio(!this.props.showFullBio);
    }

    getBio() { 
        if (this.state.provider == '') {
            return "";
        }
        return this.props.showFullBio ? this.state.provider.bio : this.state.provider.bio.slice(0,200).concat("...");
    }
     
    render() {
        return (
            <div className="booking-page">
                <div className='booking-content'>
                    <div className='header-nav'>
                        <div onClick={() => this.navigateHome()}>{this.navTextBuilder()}</div>
                    </div>
                <div className='booking-row'>
                    <div className='booking-left'>
                        <img className='avatar-img-square' src={this.checkAvatarUrl(this.state.provider.avatar)} alt={"avatar of provider"} />
                    </div>
                    <div className='booking-right'>
                        <div className='top'>
                            <div className='provider-name'><strong>{this.nameTextBuilder()}</strong></div>
                            <div>Psychologist</div>
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
                                    <div><strong>{this.state.provider.languages}</strong></div>
                                </div>
                            </div>
                            <button className='book-btn'>Book with us</button>
                        </div>
                    </div>
                </div>
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

        return <Component {...props} navigate={navigate} providerid ={ providerid } showFullBio={showFullBio} setFullBio={setFullBio} />;
    }
    return ComponentWithHook;
}

export default addNavigateTo(Booking);