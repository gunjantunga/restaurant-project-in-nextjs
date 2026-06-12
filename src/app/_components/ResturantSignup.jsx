"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ResturantSignup() {

    const [signupData, setSignupData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        resturantName: "",
        city: "",
        address: "",
        contactNumber: ""
    });

    const route = useRouter();
    const [formDataError, setFormDataError] = useState({});
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    const validateForm = () => {

        let error = {};
        let formIsValid = true;

        if (!signupData.email) {
            error.email = "Email is required";
            formIsValid = false;
        }
        if (!signupData.password) {
            error.password = "Password is required";
            formIsValid = false;
        }
        if (!signupData.confirmPassword) {
            error.confirmPassword = "Confirm Password is required";
            formIsValid = false;
        }
        if (signupData.password !== signupData.confirmPassword) {
            error.confirmPassword = "Password and Confirm Password should be same";
            formIsValid = false;
        }
        if (!signupData.resturantName) {
            error.resturantName = "Resturant Name is required";
            formIsValid = false;
        }
        if (!signupData.address) {
            error.address = "Address is required";
            formIsValid = false;
        }
        if (!signupData.city) {
            error.city = "City is required";
            formIsValid = false;
        }
        if (!signupData.contactNumber) {
            error.contactNumber = "Contact Number is required";
            formIsValid = false;
        }

        setFormDataError(error);
        return formIsValid;

    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        const { confirmPassword, ...dataToSend } = signupData;

        let response = await fetch("http://localhost:3000/api/resturant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })

        if (response) {
            response = await response.json();
            if (response.success) {
                let { password, ...rest } = response.result;
                localStorage.setItem("resturantUser", JSON.stringify(rest));
                route.push("/resturant/dashboard");
            }
        }
    }

    return (
        <>
            <h3>Sign Up Component</h3>
            <div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="email"
                        value={signupData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        className="input-field"
                    />
                    {formDataError.email && <p className="error-message">{formDataError.email}</p>}
                </div>
                <div className="input-wrapper">
                    <input
                        type="password"
                        name="password"
                        value={signupData.password}
                        onChange={handleInputChange}
                        placeholder="Enter Password"
                        className="input-field"
                    />
                    {formDataError.password && <p className="error-message">{formDataError.password}</p>}
                </div>

                <div className="input-wrapper">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        className="input-field"
                    />
                    {formDataError.confirmPassword && <p className="error-message">{formDataError.confirmPassword}</p>}
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="resturantName"
                        value={signupData.resturantName}
                        onChange={handleInputChange}
                        placeholder="Enter Resturant name"
                        className="input-field"
                    />
                    {formDataError.resturantName && <p className="error-message">{formDataError.resturantName}</p>}
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="city"
                        value={signupData.city}
                        onChange={handleInputChange}
                        placeholder="Enter City"
                        className="input-field"
                    />
                    {formDataError.city && <p className="error-message">{formDataError.city}</p>}
                </div>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="address"
                        value={signupData.address}
                        onChange={handleInputChange}
                        placeholder="Enter full Address"
                        className="input-field"
                    />
                    {formDataError.address && <p className="error-message">{formDataError.address}</p>}
                </div>
                <div className="input-wrapper">
                    <input
                        type="number"
                        name="contactNumber"
                        value={signupData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Contact number"
                        className="input-field"
                    />
                    {formDataError.contactNumber && <p className="error-message">{formDataError.contactNumber}</p>}
                </div>
                <div className="input-wrapper">
                    <button onClick={handleSubmit} className="button">Sign Up</button>
                </div>
            </div>
        </>
    )
}
export default ResturantSignup;
