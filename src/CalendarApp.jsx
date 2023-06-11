import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RouterApp } from './router';
import { store } from './store';

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </Provider>
  );
};
