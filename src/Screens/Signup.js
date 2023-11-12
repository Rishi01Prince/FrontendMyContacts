import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    // const [location, setlocation] = useState("");
    // const [address, setAddress] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
    });
    // let [address, setAddress] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        //synthetic Event
        e.preventDefault();
        // Reset error message
        setErrorMessage("");

        // Validate input
        if (
            !credentials.name ||
            !credentials.email ||
            !credentials.password ||
            !repeatPassword
        ) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        if (credentials.password !== repeatPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!agreeTerms) {
            setErrorMessage("Please agree to the terms of service.");
            return;
        }

        const response = await fetch(
            "https://mycontactbackend.onrender.com/api/createuser",
            //"http://localhost:8000/api/createuser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                }),
            }
        );

        const json = await response.json();
        if (json.success) {
            localStorage.setItem("name", credentials.name);
            console.log(json);
            navigate("/login");
        } else {
            alert("Enter Valid Credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div>
                <div className="container h-80">
                    <div className="row d-flex justify-content-center align-items-center h-80">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black">
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                Sign up
                                            </p>

                                            {errorMessage && (
                                                <div
                                                    className="alert alert-danger"
                                                    role="alert"
                                                >
                                                    {errorMessage}
                                                </div>
                                            )}

                                            <form
                                                className="mx-1 mx-md-4"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            value={
                                                                credentials.name
                                                            }
                                                            onChange={onChange}
                                                            name="name"
                                                        />
                                                        <label
                                                            className="form-label"
                                                            htmlFor="form3Example1c"
                                                        >
                                                            Your Name
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-1 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            id="form3Example3c"
                                                            className="form-control"
                                                            value={
                                                                credentials.email
                                                            }
                                                            onChange={onChange}
                                                            name="email"
                                                        />
                                                        <label
                                                            className="form-label"
                                                            htmlFor="form3Example3c"
                                                        >
                                                            Your Email
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-lock fa-lg me-2 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="form3Example4c"
                                                            className="form-control"
                                                            value={
                                                                credentials.password
                                                            }
                                                            onChange={onChange}
                                                            name="password"
                                                        />
                                                        <label
                                                            className="form-label"
                                                            htmlFor="form3Example4c"
                                                        >
                                                            Password
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fas fa-key fa-lg me-2 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="form3Example4cd"
                                                            className="form-control"
                                                            value={
                                                                repeatPassword
                                                            }
                                                            onChange={(e) =>
                                                                setRepeatPassword(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            name="repeatpassword"
                                                        />
                                                        <label
                                                            className="form-label"
                                                            htmlFor="form3Example4cd"
                                                        >
                                                            Repeat your password
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="m-3"></div>

                                                <div className="form-check d-flex justify-content-center mb-2">
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        value={agreeTerms}
                                                        id="form2Example3c"
                                                        onChange={(e) =>
                                                            setAgreeTerms(
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="form2Example3"
                                                    >
                                                        I agree all statements
                                                        in{" "}
                                                        <Link to="#">
                                                            Terms of service
                                                        </Link>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-outline-secondary btn-lg"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <Link
                                                        to="/login"
                                                        className="btn btn-outline-secondary btn-lg"
                                                    >
                                                        Already a User
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid"
                                                alt="Sample image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
