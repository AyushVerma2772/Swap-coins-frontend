import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from './App';
import { Provider } from "react-redux"
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <Provider store={store}>

          <App />
          <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />


      </Provider>
    </PersistGate>
  </BrowserRouter>
);

