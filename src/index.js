import React, { StrictMode }from 'react';
// import ReactDOM from 'react-dom';

import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './AuthContext';
import { createRoot } from 'react-dom/client';

// ReactDOM.render(<App />, document.getElementById('root'));
const container = document.getElementById('root')
const root = createRoot(container);
root.render(
    <App />
);
