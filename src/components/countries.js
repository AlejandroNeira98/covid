import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import CountryCard from './countryCard';
import styles from './styles/countries.module.css';
import img from './image/worldFlags.jpg';

export default function Countries() {
  const countries = useSelector((state) => state.countries, shallowEqual);
  const countriesList = Object.entries(countries);
  const [searchValue, setSearchValue] = useState('');
  let totalCases = 0;
  let count = 0;
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  countriesList.forEach((country) => {
    totalCases += country[1].today_new_confirmed;
  });

  return (
    <>
      <div className={styles.header}>
        <div className={styles.img}>
          <img src={img} alt="World Flags" />
        </div>
        <div className={styles.totalCases}>
          <p className={styles.title}>{'World\'s Total New Cases: '}</p>
          <p className={styles.total}>{totalCases}</p>
        </div>
      </div>
      <div className={styles.input}>
        <input type="text" onChange={handleSearch} value={searchValue} placeholder="Search" />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {countriesList.filter((country) => (
          country[0].toLowerCase().includes(searchValue.toLowerCase())
        )).map((country) => {
          count += 1;
          return (
            <CountryCard
              name={country[0]}
              deaths={country[1].today_new_deaths}
              recovered={country[1].today_new_recovered}
              confirmed={country[1].today_new_confirmed}
              key={country[1].id}
              id={country[1].id}
              count={count}
            />
          );
        })}
      </div>
    </>
  );
}
