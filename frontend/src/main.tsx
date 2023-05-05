import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import httpBackend from 'i18next-http-backend';
import languageDetector from 'i18next-browser-languagedetector';
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

i18next
  .use(httpBackend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['ka', 'en'],
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

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
