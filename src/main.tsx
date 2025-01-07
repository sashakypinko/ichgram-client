import ReactDOM from 'react-dom/client';
import App from './app';
import { setupStore } from '@app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={setupStore()}>
    <App />
  </Provider>,
);
