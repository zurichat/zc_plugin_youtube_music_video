import { Provider } from 'react-redux';

import store from './app/store';

import App from './App';

export default function Root(props) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
