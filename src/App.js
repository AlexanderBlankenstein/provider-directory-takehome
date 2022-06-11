import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import {fetchProviders, fetchProvider} from "./api";
import ProviderList from './ProviderList'

const LOCAL_STORAGE_KEY = 'providerApp.providers'

function App() {
  // Samples of API requests
  fetchProviders().then(console.log)
  fetchProvider("1").then(console.log) 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Browse our providers</h1>
        <h3>Mental Wellness</h3>
        <button>ON</button>
      </header>
      <section>
        <div>0 providers in Ontario</div>
        <ProviderList />
      </section>
    </div>
  );
}

export default App;
