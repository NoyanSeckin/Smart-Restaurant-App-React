import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// redux dependencies
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducers";
const store = createStore(reducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

