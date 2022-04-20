import React from 'react';
import { NavLink } from 'react-router-dom';

export default function countryCard(props) {
  return (
    <div>
      <div>{props.name}</div>
      <div>
        <div>Last 24h update</div>
        <ul>
          <li>
            Cases Confirmed:
            {props.confirmed}
          </li>
          <li>
            New Recovered:
            {props.recovered}
          </li>
          <li>
            New Deaths:
            {props.deaths}
          </li>
        </ul>
      </div>
      <NavLink to={`/Country/${props.id}/${props.name}`}><button type="button">See more</button></NavLink>
    </div>
  );
}
