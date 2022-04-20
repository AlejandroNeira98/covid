import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import CountryCard from './countryCard';

export default function countries() {
  const countriesList = useSelector((state) => state.countriesList, shallowEqual);
  return (
    <div>
      {countriesList.map((country) => (
        <CountryCard
          flag={country.flag}
          name={country.name}
          deaths={country.deaths}
          recovered={country.recovered}
          confirmed={country.confirmed}
          key={country.name}
        />
      ))}
    </div>
  );
}
