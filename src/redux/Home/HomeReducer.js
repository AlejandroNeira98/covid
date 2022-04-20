const url = 'https://api.covid19tracking.narrativa.com/api/';

const FETCH_TODAYS_DATA = 'covid-stats/Home/FETCH_TODAYS_DATA';

export default function countriesReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_TODAYS_DATA:
      return action.data.dates[action.today].countries;
    default:
      return state;
  }
}

export function getCountries() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;

  return async (dispatch) => {
    await fetch(`${url}${today}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_TODAYS_DATA, data, today });
      });
  };
}
