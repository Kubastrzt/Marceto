import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';
import {BrowserRouter, useNavigate, Route, Routes} from "react-router-dom";
import {
    ClerkProvider,
    SignIn,
    SignUp
} from "@clerk/clerk-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const ClerkWithRoutes = () =>{
    const navigate = useNavigate();

    return (
        <ClerkProvider publishableKey={clerkPubKey} navigate={(to)=> {navigate(to)}}>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/sign-up/*' element={<SignUp redirectUrl='/home' routing='path' path='/sign-up'/>}/>
                <Route path='/sign-in/*' element={<SignIn redirectUrl='/home' routing='path' path='/sign-in'/>}/>
            </Routes>
        </ClerkProvider>
    )
}

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ClerkWithRoutes />
      </BrowserRouter>
  </React.StrictMode>
);

