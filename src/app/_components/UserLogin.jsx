"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function UserLogin(redirect) {
    const [userLoginData, setUserLoginData] = useState({
        email: "",
        password: ""
    });

    const route = useRouter();

    const [formDataError, setFormDataError] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserLoginData({
            ...userLoginData,
            [name]: value
        })
    }

    const validateForm = () => {

        let error = {};
        let formIsValid = true;


        if (!userLoginData.email) {
            error.email = "Email is required";
            formIsValid = false;
        }
        if (!userLoginData.password) {
            error.password = "Password is required";
            formIsValid = false;
        }

        setFormDataError(error);
        return formIsValid;

    }

    const handleLogin = async () => {
        if (!validateForm()) return;

        let response = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: userLoginData.email, password: userLoginData.password })
        })

        response = await response.json();
        if (response.success) {
            let { result } = response;
            delete result.password;
            localStorage.setItem("user", JSON.stringify(result));
            if (redirect) {
                route.push("/");
            } else {
                route.push("/");
            }
        } else {
            alert("Something went wrong");
        }
        setUserLoginData({
            email: "",
            password: "",
        })
    }

    return (
        <div>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Enter Email"
                    className="input-field"
                    name="email"
                    value={userLoginData.email}
                    onChange={handleInputChange}
                />
                {formDataError.email && <p className="error-message">{formDataError.email}</p>}

            </div>
            <div className="input-wrapper">
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="input-field"
                    name="password"
                    value={userLoginData.password}
                    onChange={handleInputChange}
                />
                {formDataError.password && <p className="error-message">{formDataError.password}</p>}

            </div>
            <div className="input-wrapper">
                <button onClick={handleLogin} className="button">Login</button>
            </div>
        </div>
    )
}

export default UserLogin;