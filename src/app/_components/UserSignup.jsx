"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function UserSignup() {


    const [userSignupData, setUserSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        address: "",
        contactNumber: ""

    });
    const route = useRouter();

    const [formDataError, setFormDataError] = useState({});
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
        if (!userSignupData.email) {
            error.email = "Email is required";
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
        if (!userSignupData.contactNumber) {
            error.contactNumber = "Contact Number is required";
            formIsValid = false;
        }


        setFormDataError(error);
        return formIsValid;

    }

    const handleSignup=async ()=>{
        if(!validateForm()) return;

        const {confirmPassword,...dataToSend} = userSignupData;
        
        let response = await fetch("http://localhost:3000/api/user",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(dataToSend)
        })

        response = await response.json();
        if(response.success){
            let {result} = response;
            delete result.password;
            localStorage.setItem("user",JSON.stringify(result));
            route.push("/");
        }else{
            alert("Something went wrong");
        }
        setUserSignupData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            city: "",
            address: "",
            contactNumber: ""
        })
    }

    return (
        <div>
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
                    type="text" 
                    placeholder="Enter Email" 
                    className="input-field" 
                    name="email" 
                    value={userSignupData.email} 
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
                    <input
                        type="number"
                        name="contactNumber"
                        value={userSignupData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Contact number"
                        className="input-field"
                    />
                    {formDataError.contactNumber && <p className="error-message">{formDataError.contactNumber}</p>}
                </div>
            <div className="input-wrapper">
                <button onClick={handleSignup} className="button">Sign Up</button>
            </div>
        </div>
    )
}
export default UserSignup;