import './App.css';
import {fetchProviders, fetchProvider} from "./api";

function App() {
  // Samples of API requests
  fetchProviders().then(console.log)
  fetchProvider("1").then(console.log)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World!</h1>
      </header>
    </div>
  );
}

export default App;
