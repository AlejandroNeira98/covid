import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import countriesReducer from './Home/HomeReducer';
import countryReducer from './CountryDetails/countryReducer';

const rootReducer = combineReducers({
  countries: countriesReducer,
  country: countryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
