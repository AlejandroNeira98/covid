import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import { getCountry } from '../redux/CountryDetails/countryReducer';

export default function CountryDetails() {
  const dispatch = useDispatch();
  const { id, name } = useParams();

  useEffect(() => { dispatch(getCountry(id, name)); }, []);

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const {
    confirmed, deaths, dates, dateStart, dateEnd, thisDay,
  } = useSelector((state) => state.country, shallowEqual);

  const handleDateChange = (start, end) => {
    dispatch(getCountry(id, name, start, end));
  };
  console.log( dateStart, dateEnd, thisDay);

  const data = (x, y, category) => ({
    x,
    datasets: [
      {
        label: `${category}`,
        data: y,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  const lineOptions = () => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${name}:`,
      },
    },
  });

  return (
    <div>
      <form>
        <label htmlFor="start">
          Start date:
          <input
            type="date"
            id="start"
            value={dateStart && `${dateStart.yyyy}-${dateStart.mm}-${dateStart.dd}`}
            min="2018-01-01"
            max={thisDay && `${thisDay.yyyy}-${thisDay.mm}-${thisDay.dd}`}
          />
        </label>
        <label htmlFor="end">
          End date:
          <input
            type="date"
            id="end"
            value={dateEnd && `${dateEnd.yyyy}-${dateEnd.mm}-${dateEnd.dd}`}
            min="2018-01-01"
            max={thisDay && `${thisDay.yyyy}-${thisDay.mm}-${thisDay.dd}`}
          />
        </label>

        <label htmlFor="category">
          Choose a category:
          <select name="category" id="category">
            <option value="confirmed">Confirmed</option>
            <option value="deaths">Deaths</option>
          </select>
        </label>
      </form>
      <Line options={lineOptions()} data={data(dates, deaths, 'New Deaths')} />
      <Line options={lineOptions()} data={data(dates, confirmed, 'New Confirmed')} />
    </div>
  );
}
