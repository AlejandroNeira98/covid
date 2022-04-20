import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function CountryDetails() {
  const { country } = useParams();
  const countryData = useSelector((state) => state.selectedCountry, shallowEqual);
  return (
    <form>
      <label htmlFor="start">
        Start date:
        <input
          type="date"
          id="start"
          /* value={ yesterday } */
          min="2018-01-01"
          max="2018-12-31"
        />
      </label>
      <label htmlFor="end">
        Start date:
        <input
          type="date"
          id="end"
          /* value={ today } */
          min="2018-01-01"
          max="2018-12-31"
        />
      </label>

      <label htmlFor="category">
        Choose a category:
        <select name="category" id="category">
          <option value="confirmed">Confirmed</option>
          <option value="recovered">Recovered</option>
          <option value="hospitalized_patients">hospitalized patients</option>
          <option value="deaths">Deaths</option>
        </select>
      </label>
    </form>
  );
}
