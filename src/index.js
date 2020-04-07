import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from "@material-ui/core";

import App from './App';
import * as serviceWorker from './serviceWorker';

// Renders the DOM with App wrapped with a router to route to every page
ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
