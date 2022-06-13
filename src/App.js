import './App.css';
import {fetchProviders, fetchProvider} from "./api";
import ProviderList from './ProviderList'
import Header from './Header'

function App() {
  // Samples of API requests
  fetchProviders().then(console.log)
  fetchProvider("1").then(console.log) 

  return (
    <div className="App">
      <header className="app-header">
        <div className='content header'>
          <Header />
        </div>
      </header>
      <section className='provider-section'>
        <div className='content'>
          <ProviderList />
        </div>
      </section>
    </div>
  );
}

export default App;
