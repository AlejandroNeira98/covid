import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles/countryCard.module.css';

export default function countryCard(props) {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <NavLink to={`/Country/${props.id}/${props.name}`}>
          <button type="button" className={styles.button}>{'>'}</button>
        </NavLink>
      </div>
      <div>
        <img src={`https://countryflagsapi.com/png/${props.id}`} alt="flag" />
      </div>
      <div>
        <div className={styles.name}>{props.name}</div>
      </div>
      <div>
        24h confirmed cases:
      </div>
      <div>
        {' '}
        {props.confirmed}
        {' '}
      </div>
    </div>
  );
}
