import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';

const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/Country" element={<CountryDetails />} /> */}
      </Routes>
    </Router>
  </div>
);

export default App;
