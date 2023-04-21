import Home from "./pages/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import AboutUs from "./pages/aboutus/aboutUs";
import NavBar from "./components/navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
   return (
      <div className="App">
         <NavBar />
         <div>
            <Footer />
         </div>
      </div>
   );
}

export default App;
