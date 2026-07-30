"use client";
import React, { useState } from "react";
import ResturantFooter from "../_components/ResturantFooter";
import CustomerDashboard from "../_components/CustomerDashboard";
import UserSignup from "../_components/UserSignup";
import UserLogin from "../_components/UserLogin";
import { useSearchParams } from "next/navigation";

function UserAuth() {

    const [login, setLogin] = useState(true);
    const searchParams = useSearchParams();

    const orderNow = searchParams.get("order-now");
    return (
        <div>
            <CustomerDashboard />
            <div className="container">
                <h2>{login ? "User Login" : "User Signup"}</h2>
                {login ? <UserLogin redirect={orderNow}/> : <UserSignup redirect={orderNow}/>}
                <button className="button-link" onClick={() => setLogin(!login)}>{login ? "Do not have account? Signup" : "Already have account ? login"}</button>
            </div>
            <ResturantFooter />
        </div>
    )
}

export default UserAuth;