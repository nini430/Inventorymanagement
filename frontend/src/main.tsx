import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './App.tsx';
import store from './store/store.ts';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'flag-icon-css/sass/flag-icons.scss';
import './index.css';
import Loading from './components/Loading.tsx';
import '../src/utils/i18next.ts'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </Suspense>
);
