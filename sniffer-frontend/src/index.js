import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style/css/app.css'
import './style/css/materialize.css'
import './style/css/margin-padding-helper.css'
import './style/css/color-pallete.css'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
const store = configureStore();
ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();