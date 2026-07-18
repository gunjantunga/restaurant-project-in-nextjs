"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function ResturantLogin() {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState({})
    const route = useRouter();

    const validateData = () => {
        let error = {};
        let formIsValid = true;

        if (!loginData.email) {
            error.email = "Email is required";
            formIsValid = false;
        }
        if (!loginData.password) {
            error.password = "Password is required";
            formIsValid = false;
        }
        setError(error);
        return formIsValid;
    }

    const handleSubmit = async () => {
        if (!validateData()) {
            return;
        }

        let response = await fetch("http://localhost:3000/api/resturant", {
            method: "POST",
            body: JSON.stringify({ email: loginData.email, password: loginData.password, login: true }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        response = await response.json();
        if (response.success) {
            const {password,...rest} = response.result;
            localStorage.setItem("resturantUser", JSON.stringify(rest));
            route.push("/resturant/dashboard");
        }else{
            alert("User not found");
        }
    }

    return (
        <>
            <h3>Login Component</h3>
            <div>
                <div className="input-wrapper">
                    <input
                        name="email"
                        type="text"
                        placeholder="Enter Email"
                        value={loginData.email}
                        className="input-field"
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    />
                {error.email && <div style={{ color: "red" }}>{error.email}</div>}
                </div>
                <div className="input-wrapper">
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={loginData.password}
                        className="input-field"
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}

                    />

                {error.password && <div style={{ color: "red" }}>{error.password}</div>}
                </div>
                <div className="input-wrapper">
                    <button onClick={handleSubmit} className="button">Login</button>
                </div>
            </div>
        </>
    )
}
export default ResturantLogin;
