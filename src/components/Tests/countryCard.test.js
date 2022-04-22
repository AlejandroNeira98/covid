import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import CountryCard from '../countryCard';
import store from '../../redux/configureStore';

it('works', () => {
  const tree = render(
    <Provider store={store}>
      <Router>
        <CountryCard />
      </Router>
    </Provider>,
  );
  expect(tree).toMatchSnapshot();
});

it('renders correctly', () => {
  render(
    <Provider store={store}>
      <Router>
        <CountryCard />
      </Router>
    </Provider>,
  );
  expect(screen.getByText(/Cases Confirmed:/)).toBeInTheDocument();
});
