import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import userReducer from "./features/user";
import restReducer from "./features/rest";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


const store=configureStore({
  reducer:{
    user: userReducer,
    rest: restReducer,
    
  },
});


ReactDOM.render(
  <Provider store={store}>
  <App/></Provider>,
  document.getElementById('root')
);




