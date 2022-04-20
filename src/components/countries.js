import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import CountryCard from './countryCard';
import { getCountries } from '../redux/Home/HomeReducer';

export default function Countries() {
  const countries = useSelector((state) => state.countries, shallowEqual);
  const countriesList = Object.entries(countries);

  return (
    <div>
      {countriesList.map((country) => (
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
  );
}
