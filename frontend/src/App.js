import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ProductPage from "./pages/product/ProductPage";
import CategoryPage from "./pages/category/CategoryPage";
import PopupProvider from "./providers/PopupProvider";
import AlertProvider from "./providers/AlertProvider";
import Cart from "./pages/cart/Cart";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
        <PopupProvider/>
        <AlertProvider/>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/product/:productId" element={<ProductPage/>} />
                <Route path="/category/:categoryId" element={<CategoryPage/>} />
                <Route path="/cart" element={<Cart/>} />
            </Routes>
        <Footer/>
    </div>
  );
}

export default App;
