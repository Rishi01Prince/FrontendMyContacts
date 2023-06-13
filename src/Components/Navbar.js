import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Badge } from 'react-bootstrap';

function Navbar() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(localStorage.getItem("name"));



    const handleLogout = () => {

        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("name");
        navigate("/login");
    }

    useEffect(() => {
        setUserName(localStorage.getItem("name"));
    }, [localStorage.getItem("name")]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg  navbar navbar-dark bg-dark navbar-light bg-light">
                <div className="container-fluid">


                    <Link className="navbar-brand " to="/"> EasyReach  {userName} </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/aboutus">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contactus">Contact Us</Link>
                            </li>
                        </ul>



                        {/* // Agar Login ni hai to signup or login oprion dikhega warna  log out dikhao */}
                        {(!localStorage.getItem("authToken")) ?
                            <div>
                                <Link className="btn bg bg-white mx-1" to="/login">Login</Link>
                                <Link className="btn bg bg-white mx-1" to="/signup">SignUp</Link>
                            </div>
                            :
                            <div>
                                <div>

                                    <Link className="btn bg bg-white  text-danger mx-1" to="/login" onClick={handleLogout}>Logout</Link>

                                </div>
                            </div>
                        }

                    </div>
                </div>
            </nav >



        </div >
    )
}

export default Navbar;
