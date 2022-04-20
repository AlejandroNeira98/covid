import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountry } from '../redux/CountryDetails/countryReducer';

export default function CountryDetails() {
  const dispatch = useDispatch();
  const { id, name } = useParams();

  useEffect(() => dispatch(getCountry(id, name)), []);

  const {
    dates, recovered, confirmed, hospitalized, deaths,
  } = useSelector((state) => state.country, shallowEqual);

  const handleDateChange = (start, end) => {
    dispatch(getCountry(id, name, start, end));
  };
  console.log( dates, recovered, confirmed, hospitalized, deaths);
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
