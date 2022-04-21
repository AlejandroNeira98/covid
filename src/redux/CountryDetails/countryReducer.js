const url = 'https://api.covid19tracking.narrativa.com/api/country/';

const FETCH_COUNTRY_DATA = 'covid-stats/Home/FETCH_COUNTRY_DATA';

export default function countryReducer(state = {}, action) {
  let datesInfo = [];
  const recovered = [];
  const confirmed = [];
  const deaths = [];
  const dates = [];

  switch (action.type) {
    case FETCH_COUNTRY_DATA:
      datesInfo = Object.entries(action.data.dates);
      datesInfo.forEach((date) => {
        recovered.push(
          [
            date[1].countries[action.name].today_new_recovered,
          ],
        );
        confirmed.push(
          [date[0],
            date[1].countries[action.name].today_new_confirmed,
          ],
        );
        deaths.push(
          [date[0],
            date[1].countries[action.name].today_new_deaths,
          ],
        );
        dates.push(
          [date[0]],
        );
      });
      return {
        recovered,
        confirmed,
        deaths,
        dates,
        dateStart: action.dateStart,
        dateEnd: action.dateEnd,
        thisDay: action.thisDay,
      };
    default:
      return state;
  }
}

function today() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = { yyyy, mm, dd };
  return today;
}

function aWeekAgo() {
  const today = new Date();
  let aWeekAgo = new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000);
  const dd = String(aWeekAgo.getDate()).padStart(2, '0');
  const mm = String(aWeekAgo.getMonth() + 1).padStart(2, '0');
  const yyyy = aWeekAgo.getFullYear();
  aWeekAgo = { yyyy, mm, dd };
  return aWeekAgo;
}

export function getCountry(
  countryId, name, dateStart = aWeekAgo(), dateEnd = today(), thisDay = today(),
) {
  return async (dispatch) => {
    await fetch(`${url}${countryId}?date_from=${dateStart.yyyy}-${dateStart.mm}-${dateStart.dd}&date_to=${dateEnd.yyyy}-${dateEnd.mm}-${dateEnd.dd}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: FETCH_COUNTRY_DATA, data, name, dateStart, dateEnd, thisDay,
        });
      });
  };
}
