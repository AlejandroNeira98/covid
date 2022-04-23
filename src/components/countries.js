import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import CountryCard from './countryCard';

export default function Countries() {
  const countries = useSelector((state) => state.countries, shallowEqual);
  const countriesList = Object.entries(countries);
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div>
        <input type="text" onChange={handleSearch} value={searchValue} placeholder="Search" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {countriesList.filter((country) => (
          country[0].toLowerCase().includes(searchValue.toLowerCase())
        )).map((country) => (
          <CountryCard
            name={country[0]}
            deaths={country[1].today_new_deaths}
            recovered={country[1].today_new_recovered}
            confirmed={country[1].today_new_confirmed}
            key={country[1].id}
            id={country[1].id}
          />
        ))}
      </div>
    </>
  );
}
