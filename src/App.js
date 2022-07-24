import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './components/home';
import CountryDetails from './components/countryDetailsPage';
import { getCountries } from './redux/Home/HomeReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Country/:id/:name" element={<CountryDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
