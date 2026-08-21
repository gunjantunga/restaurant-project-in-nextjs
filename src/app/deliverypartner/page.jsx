"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryHeader from "../deliverydashboard/DeliveryHeader"
function DeliveryPartner() {

    const [loginMobile, setLoginMobile] = useState("");
    const [loginPassword, setLoginPassword] = useState('');
    const route = useRouter();

    const [userSignupData, setUserSignupData] = useState({
        name: "",
        password: "",
        confirmPassword: "",
        city: "",
        address: "",
        mobile: ""
    });
    const [formDataError, setFormDataError] = useState({});
    const [formDataErrForLogin, setFormDataErrForLogin] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserSignupData({
            ...userSignupData,
            [name]: value
        })
    }

    const validateForm = () => {

        let error = {};
        let formIsValid = true;

        if (!userSignupData.name) {
            error.name = "Name is required";
            formIsValid = false;
        }
        if (!userSignupData.password) {
            error.password = "Password is required";
            formIsValid = false;
        }
        if (!userSignupData.confirmPassword) {
            error.confirmPassword = "Confirm Password is required";
            formIsValid = false;
        }
        if (userSignupData.password !== userSignupData.confirmPassword) {
            error.confirmPassword = "Password and Confirm Password should be same";
            formIsValid = false;
        }

        if (!userSignupData.address) {
            error.address = "Address is required";
            formIsValid = false;
        }
        if (!userSignupData.city) {
            error.city = "City is required";
            formIsValid = false;
        }
        if (!userSignupData.mobile) {
            error.mobile = "Mobile Number is required";
            formIsValid = false;
        }


        setFormDataError(error);
        return formIsValid;

    }

    const handleSignup = async () => {
        if (!validateForm()) return;

        const { confirmPassword, ...dataToSend } = userSignupData;

        let response = await fetch("http://localhost:3000/api/deliverypartners/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        response = await response.json();
        if (response.success) {
            let { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            if (result) {
                route("/deliverydashboard")

            }

        } else {
            alert("Something went wrong");
        }
        setUserSignupData({
            name: "",
            password: "",
            confirmPassword: "",
            city: "",
            address: "",
            mobile: ""
        })
    }


    const validateLoginForm = () => {

        let error = {};
        let formIsValid = true;


        if (!loginMobile) {
            error.mobile = "Email is required";
            formIsValid = false;
        }
        if (!loginPassword) {
            error.password = "Password is required";
            formIsValid = false;
        }

        setFormDataErrForLogin(error);
        return formIsValid;

    }

    const handleLogin = async () => {
        if (!validateLoginForm()) return;

        let response = await fetch("http://localhost:3000/api/deliverypartners/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
        })

        response = await response.json();
        if (response.success) {
            let { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            if (result) {
                route("/deliverydashboard")
            }
        } else {
            alert("Something went wrong");
        }
        setLoginMobile("");
        setLoginPassword("");
    }


    useEffect(() => {
        let delivery = JSON.parse(localStorage.getItem("delivery"));
        if (delivery) {
            route.push("/deliverydashboard");
        }
    }, [])


    return (
        <div>
            <DeliveryHeader />
            <div className="auth-container">
                <div className="login-wrapper">
                    <h3>Login</h3>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" placeholder="Enter mobile no" value={loginMobile} onChange={(e) => setLoginMobile(e.target.value)} />
                        {formDataErrForLogin.mobile && <p className="error-message">{formDataErrForLogin.mobile}</p>}

                    </div>
                    <div className="input-wrapper">
                        <input type="password" className="input-field" placeholder="Enter password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        {formDataErrForLogin.password && <p className="error-message">{formDataErrForLogin.password}</p>}

                    </div>
                    <div className="input-wrapper">
                        <button onClick={handleLogin} className="button">Login</button>
                    </div>
                </div>
                <div className="signup-wrapper">
                    <h3>Signup</h3>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="name"
                            value={userSignupData.name}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                            className="input-field"
                        />
                        {formDataError.name && <p className="error-message">{formDataError.name}</p>}

                    </div>
                    <div className="input-wrapper">
                        <input
                            type="number"
                            name="mobile"
                            value={userSignupData.mobile}
                            onChange={handleInputChange}
                            placeholder="Enter Mobile number"
                            className="input-field"
                        />
                        {formDataError.mobile && <p className="error-message">{formDataError.mobile}</p>}
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="input-field"
                            name="password"
                            value={userSignupData.password}
                            onChange={handleInputChange}
                        />
                        {formDataError.password && <p className="error-message">{formDataError.password}</p>}

                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="input-field"
                            name="confirmPassword"
                            value={userSignupData.confirmPassword}
                            onChange={handleInputChange}

                        />
                        {formDataError.confirmPassword && <p className="error-message">{formDataError.confirmPassword}</p>}

                    </div>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Enter City"
                            className="input-field"
                            name="city"
                            value={userSignupData.city}
                            onChange={handleInputChange}
                        />
                        {formDataError.city && <p className="error-message">{formDataError.city}</p>}

                    </div>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Enter Address"
                            className="input-field"
                            name="address"
                            value={userSignupData.address}
                            onChange={handleInputChange}
                        />
                        {formDataError.address && <p className="error-message">{formDataError.address}</p>}

                    </div>

                    <div className="input-wrapper">
                        <button className="button" onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryPartner;