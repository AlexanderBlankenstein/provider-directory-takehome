import React, { Component } from 'react';
import { fetchProviders } from "./api";
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
            providers: [],
            province: 'Ontario',
            loading: true
        }
    }

    /**
    * When Mounted, call "API" to provide list of providers as well as how many and save it to the state
    * Async call to wait until server responds. 
    */
    async componentDidMount() {
        let loading = true;
        const list = await fetchProviders();
        loading = false;

        this.setState({
            providers: list,
            numOfProviders: list.length,
            loading: loading
        })
    }

    /**
    * Filters out providers that don't fall within the province selected
    * @return filteredList - The list of the providers found within the province
    */
    filterList() {
        let filteredList = [];
        for (let index = 0; index < this.state.numOfProviders; index++) {
            if (this.state.providers[index].location.includes(this.props.province)) {
                filteredList.push(this.state.providers[index]);
            }
        }
        return filteredList;
    }

    /**
    * Loading Animation for when the api takes a while to display content. 
    * @return <div> - The HTML loading elements to display
    */
    renderLoadingAnimation() {
        return (
            <div className='center'>
                <div className="load-wrapp">
                    <div className="load">
                        <div className="l-1 letter">L</div>
                        <div className="l-2 letter">o</div>
                        <div className="l-3 letter">a</div>
                        <div className="l-4 letter">d</div>
                        <div className="l-5 letter">i</div>
                        <div className="l-6 letter">n</div>
                        <div className="l-7 letter">g</div>
                        <div className="l-8 letter">.</div>
                        <div className="l-9 letter">.</div>
                        <div className="l-10 letter">.</div>
                    </div>
                </div>
            </div>
        )
    }

    /**
    * Call the provider component for each provider within the list generated within state
    * @return providerList - The HTML list of the providers found within the state list
    */
    renderProviderList() {
        let providerList = []

        //filter out all the providers that dont fall within the provice selected
        let filteredList = this.filterList();

        if (this.state.loading === true) {
            return(this.renderLoadingAnimation());
        } else {
            //create the wrapper that displays the stats of how many providers were found within the province
            providerList.push(
                <div className='providers-num'>
                    <strong>{filteredList.length}</strong> providers in {this.props.province}
                </div>
            );

            //add each provider to the HTML List element if it exists within the filtered list. 
            if (filteredList.length > 0) {
                filteredList.map(provider => {
                    return providerList.push(<div key={provider.id}><Provider provider={provider} /></div>)
                })
            }
        }
        return providerList;
    }

    render() {
        return (this.renderProviderList())
    }
}

export default ProviderList;