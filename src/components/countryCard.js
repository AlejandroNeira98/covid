import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles/countryCard.module.css';

export default function countryCard(props) {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.name}>{props.name}</div>
        <div>Last 24h:</div>
      </div>
      <div>
        <ul>
          <li>
            <span> Cases Confirmed:</span>
            <span>{props.confirmed}</span>
          </li>
          <li>
            <span>New Recovered:</span>
            <span>{props.recovered}</span>
          </li>
          <li>
            <span>New Deaths:</span>
            <span>
              {' '}
              {props.deaths}
              {' '}
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.button}>
        <NavLink to={`/Country/${props.id}/${props.name}`}>
          <button type="button" className={styles.button}>See more</button>
        </NavLink>
      </div>
    </div>
  );
}
