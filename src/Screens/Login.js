import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        if (!credentials.email || !credentials.password) {
            setErrorMessage("Please enter a valid email and password.");
            return;
        }

        // Backend Verification
        const response = await fetch(
            "https://mycontactbackend.onrender.com/api/loginuser",
            //"http://localhost:8000/api/loginuser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            }
        );

        const json = await response.json();

        if (json.success) {
            console.log(json);

            // Save user email and auth token to local storage
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);

            console.log(localStorage.getItem("authToken"));
            navigate("/");
        } else {
            alert("Enter Valid Credentials");
        }
    };

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="vh-60">
                <div className="container py-5 h-60">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid"
                                alt="Phone image"
                            />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form1Example13"
                                        className="form-control form-control-lg"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        name="email"
                                    />
                                    <label
                                        className="form-label"
                                        htmlFor="form1Example13"
                                    >
                                        Email address
                                    </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form1Example23"
                                        className="form-control form-control-lg"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        name="password"
                                    />
                                    <label
                                        className="form-label"
                                        htmlFor="form1Example23"
                                    >
                                        Password
                                    </label>
                                </div>

                                {errorMessage && (
                                    <div
                                        className="alert alert-danger mb-4"
                                        role="alert"
                                    >
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="form1Example3"
                                            defaultChecked={false} // Use defaultChecked instead of checked
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="form1Example3"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="#!">Forgot password?</Link>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-outline-secondary btn-lg btn-block"
                                >
                                    Sign in
                                </button>
                                <br />
                                <br />

                                <div className="btn btn-outline-secondary btn-lg btn-block">
                                    <Link
                                        to="/signup"
                                        className="btn btn-light"
                                    >
                                        I am a new User
                                    </Link>
                                </div>

                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0  align-items-center text-muted">
                                        OR
                                    </p>
                                </div>

                                <Link
                                    className="btn btn-outline-secondary btn-lg btn-block"
                                    
                                    to="#!"
                                    role="button"
                                >
                                    <i className="fab fa-facebook-f me-2"></i>
                                    Continue with Facebook
                                </Link>
                                <Link
                                    className="btn btn-outline-secondary btn-lg btn-block"
                                    
                                    to="#!"
                                    role="button"
                                >
                                    <i className="fab fa-twitter me-2"></i>
                                    Continue with Twitter
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
