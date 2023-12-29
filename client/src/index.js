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
import Banners from "@/pages/banners/Banners";
import Banner from "@/pages/banner/Banner";
import Categories from "@/pages/categories/Categories";
import Category from "@/pages/category/Category";
import Sizes from "@/pages/sizes/Sizes";
import Size from "@/pages/size/Size";
import Colors from "@/pages/colors/Colors";
import Color from "@/pages/color/Color";
import Products from "@/pages/products/Products";
import Product from "@/pages/product/Product";
import Orders from "@/pages/orders/Orders";
import Auth from "./auth";

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
                <Route path='/autho' element={<Auth routing='path' path='/autho'/>}/>
                <Route path='/sign-up/*' element={<SignUp routing='path' path='/sign-up'/>}/>
                <Route path='/sign-in/*' element={<SignIn routing='path' path='/sign-in'/>}/>
                <Route path='/dashboard/:sid/' element={<Dashboard routing='path' path='/dashboard/:sid/'/>}/>
                <Route path='/settings/:sid/' element={<Settings routing='path' path='/settings/:sid/'/>}/>
                <Route path='/banners/:sid/' element={<Banners routing='path' path='/banners/:sid/'/>}/>
                <Route path='/banners/:sid/:bid' element={<Banner routing='path' path='/banners/:sid/:bid'/>}/>
                <Route path='/categories/:sid/' element={<Categories routing='path' path='/categories/:sid/'/>}/>
                <Route path='/categories/:sid/:cid' element={<Category routing='path' path='/categories/:sid/:cid'/>}/>
                <Route path='/sizes/:sid/' element={<Sizes routing='path' path='/sizes/:sid/'/>}/>
                <Route path='/sizes/:sid/:sizeId' element={<Size routing='path' path='/sizes/:sid/:sizeId'/>}/>
                <Route path='/colors/:sid/' element={<Colors routing='path' path='/colors/:sid/'/>}/>
                <Route path='/colors/:sid/:colorId' element={<Color routing='path' path='/colors/:sid/:colorId'/>}/>
                <Route path='/products/:sid/' element={<Products routing='path' path='/products/:sid/'/>}/>
                <Route path='/products/:sid/:productId' element={<Product routing='path' path='/products/:sid/:productId'/>}/>
                <Route path='/orders/:sid/' element={<Orders routing='path' path='/orders/:sid/'/>}/>
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

