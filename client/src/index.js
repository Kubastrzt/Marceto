import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/globals.css';
import Dashboard from '@/pages/dashboard/Dashboard';
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
import Billboards from "@/pages/billboards/Billboards";
import Billboard from "@/pages/billboard/Billboard";
import Categories from "@/pages/categories/Categories";
import Category from "@/pages/category/Category";
import Sizes from "@/pages/sizes/Sizes";
import Size from "@/pages/size/Size";
import Colors from "@/pages/colors/Colors";
import Color from "@/pages/color/Color";
import Products from "@/pages/products/Products";
import Product from "@/pages/product/Product";
import Orders from "@/pages/orders/Orders";

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
                <Route path='/settings/:uid/:sid/' element={<Settings routing='path' path='/settings/:uid/:sid/'/>}/>
                <Route path='/billboards/:uid/:sid/' element={<Billboards routing='path' path='/billboards/:uid/:sid/'/>}/>
                <Route path='/billboards/:uid/:sid/:bid' element={<Billboard routing='path' path='/billboards/:uid/:sid/:bid'/>}/>
                <Route path='/categories/:uid/:sid/' element={<Categories routing='path' path='/categories/:uid/:sid/'/>}/>
                <Route path='/categories/:uid/:sid/:cid' element={<Category routing='path' path='/categories/:uid/:sid/:cid'/>}/>
                <Route path='/sizes/:uid/:sid/' element={<Sizes routing='path' path='/sizes/:uid/:sid/'/>}/>
                <Route path='/sizes/:uid/:sid/:sizeId' element={<Size routing='path' path='/sizes/:uid/:sid/:sizeId'/>}/>
                <Route path='/colors/:uid/:sid/' element={<Colors routing='path' path='/colors/:uid/:sid/'/>}/>
                <Route path='/colors/:uid/:sid/:colorId' element={<Color routing='path' path='/colors/:uid/:sid/:colorId'/>}/>
                <Route path='/products/:uid/:sid/' element={<Products routing='path' path='/products/:uid/:sid/'/>}/>
                <Route path='/products/:uid/:sid/:productId' element={<Product routing='path' path='/products/:uid/:sid/:productId'/>}/>
                <Route path='/orders/:uid/:sid/' element={<Orders routing='path' path='/orders/:uid/:sid/'/>}/>
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

