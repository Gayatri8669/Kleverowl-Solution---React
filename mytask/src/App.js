import React from 'react'
import './App.css';
import ProfilePhoto from './Components/ProfilePhoto';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Gallery from './Components/Gallery';  



function App() {
  return (
    <Router>  
      <div className="App">
        <Routes>  
          {/* Define the routes */}
          <Route path="/" element={<ProfilePhoto />} />  
          <Route path="/gallery" element={<Gallery />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
