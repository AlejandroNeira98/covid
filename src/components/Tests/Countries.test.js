import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import Countries from '../Countries';
import store from '../../redux/configureStore';

it('works', () => {
  const tree = render(
    <Provider store={store}>
      <Countries />
    </Provider>,
  );
  expect(tree).toMatchSnapshot();
});
