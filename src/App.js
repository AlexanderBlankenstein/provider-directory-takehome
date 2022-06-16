import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './Header'
import Booking from './Booking'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="App"><Header /></div>} />
        <Route path="/Booking/:providerid" element={<div className="App"><Booking /></div>} />
      </Routes>
    </Router>
  );
}

export default App;
