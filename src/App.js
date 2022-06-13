import './App.css';
import {fetchProviders, fetchProvider} from "./api";
import ProviderList from './ProviderList'

function App() {
  // Samples of API requests
  fetchProviders().then(console.log)
  fetchProvider("1").then(console.log) 

  //TODO: add dropdown function to location button. pass this result to the providerList to search within province

  return (
    <div className="App">
      <header className="App-header">
        <div className='Content Header'>
          <h1 className='Title-main'>Browse our providers</h1>
          <h3 className='Subtitle-main'>Mental Wellness</h3>
          <button className='Location-btn'>
            <img className='btn-img' src='./location_pin.png' alt='location pin' />
            <strong>ON</strong>
          </button>
        </div>
      </header>
      <section className='Provider-section'>
        <div className='Content'>
          <ProviderList />
        </div>
      </section>
    </div>
  );
}

export default App;
