import '@testing-library/jest-dom';
import countryReducer from '../../redux/CountryDetails/countryReducer';

it('works with unrecognized action type', () => {
  expect(countryReducer({}, { type: 'other' })).toStrictEqual({});
});
