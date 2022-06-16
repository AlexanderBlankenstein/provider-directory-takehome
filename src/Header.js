import React, { Component } from 'react';
import ProviderList from './ProviderList';
import './App.css';

/**
 * A component that to set up the header and location selection services, and generate a HTML list element to display.
 * @return <div> element containing the header
 */
class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    /**
    * When Mounted, set states for the province selection button 
    */
    componentDidMount() {
        this.setState({
            showProvinceMenu: false,
            province: 'Ontario',
            provinceShort: 'ON'
        })
    }

    /**
    * toggle the state when the user requires the location selection menu to open.
    */
    showMenu() {
        if (this.state.showProvinceMenu) {
            this.setState({ showProvinceMenu: false });
        } else {
            this.setState({ showProvinceMenu: true });
        }
    }

    /**
    * changes the provice and province shorthand states to the user selected choice. 
    * @param selectedProvince - the province to "change" to
    */
    setProvince(selectedProvince) {
        this.setState({ province: selectedProvince});
        this.setState({ showProvinceMenu: false });

        switch (selectedProvince) {
            case 'Alberta': this.setState({ provinceShort: 'AB'});
            break;

            case 'British Columbia': this.setState({ provinceShort: 'BC'});
            break;

            case 'Manitoba': this.setState({ provinceShort: 'MB'});
            break;

            case 'New Brunswick': this.setState({ provinceShort: 'NB'});
            break;

            case 'Newfoundland and Labrador': this.setState({ provinceShort: 'NL'});
            break;

            case 'Northwest Territories': this.setState({ provinceShort: 'NT'});
            break;

            case 'Nova Scotia': this.setState({ provinceShort: 'NS'});
            break;

            case 'Nanavut': this.setState({ provinceShort: 'NU'});
            break;

            case 'Ontario': this.setState({ provinceShort: 'ON'});
            break;

            case 'Prince Edward Island': this.setState({ provinceShort: 'PE'});
            break;

            case 'Quebec': this.setState({ provinceShort: 'QC'});
            break;

            case 'Saskatchewan': this.setState({ provinceShort: 'SK'});
            break;

            case 'Yukon': this.setState({ provinceShort: 'YT'});
            break;

            //display ER for error in the event of an invalid choice. can be used for error handling later on. 
            default: this.setState({ provinceShort: 'ER'});
        }
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <div className='content header'>
                        <h1 className='title-main'>Browse our providers</h1>
                        <h3 className='subtitle-main'>Mental Wellness</h3>
                        <div className='dropdown'>
                            <button className='location-btn' onClick={() => {this.showMenu();}}>
                                <img className='btn-img' src='./images/location_pin.png' alt='location pin' />
                                <strong>{this.state.provinceShort}</strong>
                            </button>
                            {this.state.showProvinceMenu ? (
                                <div className='dropdown-menu btn-grid'>
                                    <div>
                                        <div className="dropdown-heading">Select your region</div>
                                        <div className="dropdown-link">
                                            <button className='location-btn' onClick={() => {this.setProvince('Alberta');}}>Alberta</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('British Columbia');}}>British Columbia</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Manitoba');}}>Manitoba</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('New Brunswick');}}>New Brunswick</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Newfoundland and Labrador');}}>Newfoundland and Labrador</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Northwest Territories');}}>Northwest Territories</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Nova Scotia');}}>Nova Scotia</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Nanavut');}}>Nanavut</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Ontario');}}>Ontario</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Prince Edward Island');}}>Prince Edward Island</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Quebec');}}>Quebec</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Saskatchewan');}}>Saskatchewan</button>
                                            <button className='location-btn' onClick={() => {this.setProvince('Yukon');}}>Yukon</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden"></div>
                            )}
                        </div>
                    </div>
                </header>
                <section className='provider-section'>
                    <div className='content'>
                        <ProviderList province={this.state.province}/>
                    </div>
                </section>
            </div>
        )
    }
}

export default Header;