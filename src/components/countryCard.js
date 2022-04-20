import React from 'react';

export default function countryCard(props) {
  <div>
    <div>
      <img alt="flag" src={props.flag} />
    </div>
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
  </div>;
}
