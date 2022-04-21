import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import { getCountry } from '../redux/CountryDetails/countryReducer';
import styles from './styles/countryDetailsPage.module.css';

export default function CountryDetails() {
  const dispatch = useDispatch();
  const { id, name } = useParams();

  useEffect(() => { dispatch(getCountry(id, name)); }, []);

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const {
    confirmed, deaths, dates, dateStart, dateEnd, thisDay,
  } = useSelector((state) => state.country, shallowEqual);

  const handleStartDateChange = (event) => {
    const start = event.target.value.split('-');
    const yyyy = start[0];
    const mm = start[1];
    const dd = start[2];
    dispatch(getCountry(id, name, { yyyy, mm, dd }, dateEnd));
  };

  const handleEndDateChange = (event) => {
    const end = event.target.value.split('-');
    const yyyy = end[0];
    const mm = end[1];
    const dd = end[2];
    dispatch(getCountry(id, name, dateStart, { yyyy, mm, dd }));
  };

  const data = (x, y, category, b) => ({
    x,
    datasets: [
      {
        label: `${category}`,
        data: y,
        borderColor: `rgb(255, 99, ${b})`,
        backgroundColor: `rgba(255, 99, ${b}, 0.5)`,
      },
    ],
  });

  return (
    <div className={styles.page}>
      <form>
        <h1>{name}</h1>
        <label htmlFor="start">
          Start date:
          <br />
          <input
            onChange={handleStartDateChange}
            type="date"
            id="start"
            value={dateStart && `${dateStart.yyyy}-${dateStart.mm}-${dateStart.dd}`}
            min="2020-01-23"
            max={thisDay && `${thisDay.yyyy}-${thisDay.mm}-${thisDay.dd}`}
          />
        </label>
        <label htmlFor="end">
          End date:
          <br />
          <input
            onChange={handleEndDateChange}
            type="date"
            id="end"
            value={dateEnd && `${dateEnd.yyyy}-${dateEnd.mm}-${dateEnd.dd}`}
            min="2020-01-23"
            max={thisDay && `${thisDay.yyyy}-${thisDay.mm}-${thisDay.dd}`}
          />
        </label>
      </form>
      <Line options={{ responsive: true }} data={data(dates, deaths, 'New Deaths', 0)} />
      <Line options={{ responsive: true }} data={data(dates, confirmed, 'New Confirmed', 132)} />
    </div>
  );
}
