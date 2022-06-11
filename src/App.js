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
        <h1>Browse our providers</h1>
        <h3>Mental Wellness</h3>
        <button>ON</button>
      </header>
      <section>
        <ProviderList />
      </section>
    </div>
  );
}

export default App;
