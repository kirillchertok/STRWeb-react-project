import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { Context } from './store/store-context.js';
import store from './store/store-context.js';
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Context.Provider value={{ store }}>
      <GoogleOAuthProvider clientId="963293089450-atcgsad4tnvdl2ah5mmbc8odlv02h7bu.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Context.Provider>
  </BrowserRouter>
)
