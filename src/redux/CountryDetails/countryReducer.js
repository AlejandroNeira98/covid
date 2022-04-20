const url = 'https://api.covid19tracking.narrativa.com/api/country/';

const FETCH_COUNTRY_DATA = 'covid-stats/Home/FETCH_COUNTRY_DATA';

function today() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return today;
}

function aWeekAgo() {
  const today = new Date();
  let aWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const dd = String(aWeekAgo.getDate()).padStart(2, '0');
  const mm = String(aWeekAgo.getMonth() + 1).padStart(2, '0');
  const yyyy = aWeekAgo.getFullYear();
  aWeekAgo = `${yyyy}-${mm}-${dd}`;
  return aWeekAgo;
}

export default function countryReducer(state = {}, action) {
  let datesInfo = [];
  const dates = [];
  const recovered = [];
  const confirmed = [];
  const hospitalized = [];
  const deaths = [];

  switch (action.type) {
    case FETCH_COUNTRY_DATA:
      datesInfo = Object.entries(action.data.dates);
      datesInfo.forEach((date) => {
        dates.push(date[0]);
        recovered.push(date[1].countries[action.name].today_new_recovered);
        confirmed.push(date[1].countries[action.name].today_new_confirmed);
        hospitalized.push(date[1].countries[action.name].today_new_total_hospitalised_patients);
        deaths.push(date[1].countries[action.name].today_new_deaths);
      });
      return {
        dates, recovered, confirmed, hospitalized, deaths,
      };
    default:
      return state;
  }
}

export function getCountry(countryId, name, dateStart = aWeekAgo(), dateEnd = today()) {
  return async (dispatch) => {
    await fetch(`${url}${countryId}?date_from=${dateStart}&date_to=${dateEnd}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_COUNTRY_DATA, data, name });
      });
  };
}
