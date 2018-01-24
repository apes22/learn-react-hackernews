import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<h1>Hello React World</h1>,document.getElementById('root'));
registerServiceWorker();

if (module.hot){
    module.hot.accept();
}