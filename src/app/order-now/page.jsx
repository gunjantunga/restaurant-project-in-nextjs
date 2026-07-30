"use client";

import React, { useState, useEffect } from "react";
import ResturantFooter from "../_components/ResturantFooter";
import "../globals.css";
import CustomerDashboard from "../_components/CustomerDashboard";

function OrderNow() {

    const [cartDetails, setCartDetails] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const total = cartDetails.reduce(
        (sum, item) => sum + item.price,
        0
    );
    useEffect(() => {
        let carts = JSON.parse(localStorage.getItem("cart")) || [];
        let user = JSON.parse(localStorage.getItem("user")) || {};
        setUserDetails(user);
        setCartDetails(carts);
    }, [])


    return (
        <div>
            <CustomerDashboard />

            <div className="total-wrapper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row">
                        <span>Name : </span>
                        <span>{userDetails?.name}</span>
                    </div>
                    <div className="row">
                        <span>Address : </span>
                        <span>{userDetails?.address}</span>
                    </div>
                    <div className="row">
                        <span>Mobile : </span>
                        <span>{userDetails?.contactNumber}</span>
                    </div>
                    <h2>Amount Details</h2>

                    <div className="row">
                        <span>Food Charges : </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax : </span>
                        <span>{total * 10 / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges : </span>
                        <span>100</span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>{total + (total * 10 / 100) + 100}</span>
                    </div>
                    <h2>Payment Methods</h2>
                    <div className="row">
                        <span>Cash on delivery : </span>
                        <span>{100}</span>
                    </div>

                </div>
                <div className="block-2"><button>Place Your Order</button></div>
            </div>
            <ResturantFooter />
        </div>
    )
}

export default OrderNow;