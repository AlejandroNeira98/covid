import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function CountryDetails() {
  const { country } = useParams();
  const countryData = useSelector((state) => )
  return (
    <div>
      <label htmlFor="start">
        Start date:
        <input
          type="date"
          id="start"
          /* value={ today } */
          min="2018-01-01"
          max="2018-12-31"
        />
      </label>
    </div>
  );
}
