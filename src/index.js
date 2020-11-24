import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import App from './App';
import { CookiesProvider } from 'react-cookie';
const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}
ReactDOM.render(

  <div className="allall">
    <div className="all">
    <CookiesProvider>
    <AlertProvider template={AlertTemplate} {...options}>
    <App/>
     </AlertProvider>
  </CookiesProvider>
</div>
<p class="footer"> Made with Love by Soumya </p>
    </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
