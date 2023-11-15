import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/globals.css';
import Dashboard from '@/pages/dashboard/Dashboard';
import {useStorePopup} from "@/hooks/useStorePopup";
import PopupProvider from "@/providers/PopupProvider";
import {BrowserRouter, useNavigate, Route, Routes} from "react-router-dom";
import {
    ClerkProvider, RedirectToSignIn, SignedIn, SignedOut,
    SignIn,
    SignUp
} from "@clerk/clerk-react";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Settings from '@/pages/settings/Settings';
import CreateStore from "@/pages/createStore/CreateStore";

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
                <Route path='/' element={
                    <>
                        <SignedIn>
                            <App/>
                            <ToastContainer/>
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn/>
                        </SignedOut>
                    </>
                }/>
                <Route path='/create-store' element={<CreateStore routing='path' path='/create-store'/>}/>
                <Route path='/sign-up/*' element={<SignUp routing='path' path='/sign-up'/>}/>
                <Route path='/sign-in/*' element={<SignIn routing='path' path='/sign-in'/>}/>
                <Route path='/dashboard/:uid/:sid/' element={<Dashboard routing='path' path='/dashboard/:uid/:sid/'/>}/>
                <Route path='/dashboard/:uid/:sid/settings/' element={<Settings routing='path' path='/dashboard/:uid/:sid/settings/'/>}/>
            </Routes>
            <PopupProvider/>
        </ClerkProvider>
    )
}

root.render(
  <BrowserRouter>
      <ClerkWithRoutes />
  </BrowserRouter>
);

