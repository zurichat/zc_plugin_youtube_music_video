import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Player from '../components/player';
import store from '../app/store';

const TestComponent = (
  <Provider store={store}>
    <Player />
  </Provider>
);

test('change song', () => {
  render(TestComponent);
  screen.debug();
  // const nextButton = screen.getByText(/NEXT/i);
  // expect(nextButton).toBeInTheDocument();
});
