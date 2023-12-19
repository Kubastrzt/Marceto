import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";

function App() {
  return (
    <div className="App">
        <Navbar/>
            <Routes>
                <Route path="/" element={<Homepage/>} />
            </Routes>
        <Footer/>
    </div>
  );
}

export default App;
