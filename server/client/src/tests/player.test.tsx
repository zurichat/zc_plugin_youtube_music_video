import React from 'react';
import { render, screen } from '@testing-library/react';
import Player from '../components/player';
import { Provider } from 'react-redux';
import store from "../store/index";

const TestComponent = <Provider store={store}><Player /></Provider>

test('change song', () => {
    render(TestComponent);
    screen.debug();
    //const nextButton = screen.getByText(/NEXT/i);
    //expect(nextButton).toBeInTheDocument();
  });
