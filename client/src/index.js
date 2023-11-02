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

const root = ReactDOM.createRoot(document.getElementById('root'));

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const ClerkWithRoutes = () =>{
    const navigate = useNavigate();

    const onOpen = useStorePopup((state)=>state.onOpen);
    const isOpen = useStorePopup((state)=>state.isOpen);

    useEffect(() => {
        if(!isOpen){
            onOpen();
        }
    }, [isOpen, onOpen]);

    return (
        <ClerkProvider publishableKey={clerkPubKey} navigate={(to)=> {navigate(to)}}>
            <Routes>
                <Route path='/' element={
                    <>
                        <SignedIn>
                            <App/>
                            <PopupProvider/>
                            <ToastContainer/>
                        </SignedIn>
                        <SignedOut>
                            <RedirectToSignIn/>
                        </SignedOut>
                    </>
                }/>
                <Route path='/sign-up/*' element={<SignUp routing='path' path='/sign-up'/>}/>
                <Route path='/sign-in/*' element={<SignIn routing='path' path='/sign-in'/>}/>
                <Route path='/dashboard/:uid/:sid/' element={<Dashboard routing='path' path='/dashboard/:uid/:sid/'/>}/>
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

