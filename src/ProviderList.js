import React, { Component } from 'react';
import {fetchProviders, fetchProvider} from "./api";
import Provider from './Provider';
import './App.css';

/**
 * A component that will call the API for all providers, and generate a HTML list element to display.
 * @return <div> element containing list of providers display
 */
class ProviderList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            providers: []
        }
    }

    /**
    * When Mounted, call "API" to provide list of providers as well as how many and save it to the state
    * Async call to wait until server responds. 
    */
    async componentDidMount() {
        const list = await fetchProviders();
        const num = list.length; 
        this.setState({
            providers: list,
            numOfProviders: num
        })
    }

    /**
    * Call the provider component for each provider within the list generated within state
    * @return providerList - The HTML list of the providers found within the state list
    */
    renderProviderList() {
        let providerList = []
        this.state.providers.map(provider => {
            return providerList.push(<Provider key={provider.id} provider={provider} />)
        })
        return providerList;
    }

    render() {
        return (
            <div>
                <div className='providers-num'><strong>{this.state.numOfProviders}</strong> providers in Ontario</div>
                <div>
                    {this.renderProviderList()}
                </div>
            </div>
        )
    }
}

export default ProviderList;