import '@testing-library/jest-dom';
import HomeReducer from '../../redux/Home/HomeReducer';

it('works with unrecognized action type', () => {
  expect(HomeReducer({}, { type: 'other' })).toStrictEqual({});
});
