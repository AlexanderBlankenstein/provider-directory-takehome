import React, { Component } from 'react';
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
        console.log(provider);
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
            return '/default_avatar.png';
        }
        return url;
    }

     
    render() {
        return (
            <div>
                <div className='header-nav'>
                    <div onClick={() => this.navigateHome()}>{this.navTextBuilder()}</div>
                </div>
                <div className='body-provider'>
                    <div className='img-side'>
                        <img className='avatar-img' src={this.checkAvatarUrl(this.state.provider.avatar)} alt={"avatar of provider"} />
                    </div>
                    <div className='info-side'>
                        <div className='top'>
                            <div className='provider-name'>{this.nameTextBuilder()}</div>
                            <div>Psychologist</div>
                            <p>{this.state.provider.bio}</p>
                            <button>Read Less ^</button>
                        </div>
                        <div className='bottom'>
                            <div className='location'>
                                <img className='avatar-img' src={this.checkAvatarUrl(this.state.provider.avatar)} alt={"location icon, a map with marker"} />
                                <div>Location</div>
                                <div>{this.state.provider.location}</div>
                            </div>
                            <div className='Education'>
                                <img className='avatar-img' src={this.checkAvatarUrl(this.state.provider.avatar)} alt={"education icon, a grad hat"} />
                                <div>Education</div>
                                <div>{this.state.provider.education}</div>
                            </div>
                            <div className='language'>
                                <img className='avatar-img' src={this.checkAvatarUrl(this.state.provider.avatar)} alt={"language icon, a globe"} />
                                <div>language</div>
                                <div>{this.state.provider.languages}</div>
                            </div>
                            <button className='book-btn'>Book with us</button>
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

        return <Component {...props} navigate={navigate} providerid ={ providerid } />;
    }
    return ComponentWithHook;
}

export default addNavigateTo(Booking);