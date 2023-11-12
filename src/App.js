import "./App.css";
import Homepage from "./Screens/Homepage";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Aboutus from "./Screens/Aboutus";
import Contactus from "./Screens/Contactus";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Chat from "./Screens/Chat";

// bootstrap
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/aboutus" element={<Aboutus />} />
                <Route exact path="/contactus" element={<Contactus />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/chat" element={<Chat />} />
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
