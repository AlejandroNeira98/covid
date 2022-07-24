import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 18,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <NavLink to="/">
          <button type="button" className={styles.button}>
            {'<'}
          </button>
        </NavLink>
        <p className={styles.name}>{name}</p>
      </div>
      <div>
        <div className={styles.flagInputContainer}>
          <img className={styles.img} src={`https://countryflagsapi.com/png/${id}`} alt="flag" />
          <form>
            <label htmlFor="start">
              Start date:
              <br />
              <input
                onChange={handleStartDateChange}
                type="date"
                id="start"
                value={dateStart ? `${dateStart.yyyy}-${dateStart.mm}-${dateStart.dd}` : '2020-01-23'}
                min="2020-01-23"
                max={thisDay ? `${thisDay.yyyy}-${thisDay.mm}-${thisDay.dd}` : '2020-01-23'}
              />
            </label>
            <label htmlFor="end">
              End date:
              <br />
              <input
                onChange={handleEndDateChange}
                type="date"
                id="end"
                value={dateEnd ? `${dateEnd.yyyy}-${dateEnd.mm}-${dateEnd.dd}` : '2020-01-23'}
                min="2020-01-23"
                max={thisDay ? `${thisDay.yyyy}-${thisDay.mm}-${thisDay.dd}` : '2020-01-23'}
              />
            </label>
          </form>
        </div>
      </div>
      <Line options={options} data={data(dates, deaths, 'New Deaths', 0)} />
      <Line options={options} data={data(dates, confirmed, 'New Confirmed', 132)} />
    </div>
  );
}
