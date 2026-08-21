"use client";

import React, { useState, useEffect } from "react";
import ResturantFooter from "../_components/ResturantFooter";
import "../globals.css";
import CustomerDashboard from "../_components/CustomerDashboard";
import { useRouter } from "next/navigation";

function OrderNow() {

    const [cartDetails, setCartDetails] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const total = cartDetails.reduce(
        (sum, item) => sum + item.price,
        0
    );
    const [removeCartData, setRemoveCartData] = useState(false);
    const route = useRouter();


    useEffect(() => {
        let carts = JSON.parse(localStorage.getItem("cart")) || [];
        let user = JSON.parse(localStorage.getItem("user")) || {};
        setUserDetails(user);
        setCartDetails(carts);
    }, [])


    const placeyourorder = async () => {

        try {

            let payload = {
                user_Id: userDetails._id,
                foodItemsId: cartDetails.map((item) => item._id).toString(),
                resto_Id: cartDetails[0].resto_id,
                deliveryBoy_Id: "1",
                status: "Confirm",
                amount: total + (total * 10 / 100) + 100

            }

            let response = await fetch("http://localhost:3000/api/order", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });
            response = await response.json();
            if (response.success) {
                alert("Order confirmed");
                // localStorage.removeItem("cart");
                setRemoveCartData(true);
                route.push("/myprofile");
            } else {
                console.log('--->', response.error);
            }

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div>
            <CustomerDashboard removeCart={removeCartData} />

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
                <div className="block-2"><button onClick={placeyourorder}>Place Your Order</button></div>
            </div>
            <ResturantFooter />
        </div>
    )
}

export default OrderNow;