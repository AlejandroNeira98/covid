const url = 'https://api.covid19tracking.narrativa.com/api/country/';

const FETCH_COUNTRY_DATA = 'covid-stats/Home/FETCH_COUNTRY_DATA';

export default function countryReducer(action, state = {}) {
  const { dates } = action.data.dates;
  switch (action.type) {
    case FETCH_COUNTRY_DATA:
      return dates;
    default:
      return state;
  }
}

export function getCountry(country, dateStart, dateEnd) {
  return async (dispatch) => {
    await fetch(`${url}${country}?date_from=${dateStart}$date_to=${dateEnd}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_COUNTRY_DATA, data });
      });
  };
}
