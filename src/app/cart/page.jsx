"use client";

import React, { useState, useEffect } from "react";
import ResturantFooter from "../_components/ResturantFooter";
import "../globals.css";
import CustomerDashboard from "../_components/CustomerDashboard";

function CartDetails() {

    const [cartDetails, setCartDetails] = useState([]);
    const total = cartDetails.reduce(
        (sum, item) => sum + item.price,
        0
    );
    useEffect(() => {
        let carts = JSON.parse(localStorage.getItem("cart")) || [];
        setCartDetails(carts);
    }, [])

    return (
        <div>
            <CustomerDashboard />
            {cartDetails.length > 0 ? <div className="food-item-wrapper">
                {cartDetails.map((food) => <div className="list-item" key={food?._id}>
                    <div className="list-item-block-1"><img src={food.img_path} width={100} style={{ marginRight: 15 }} /></div>
                    <div className="list-item-block-2">
                        <div>{food.name}</div>
                        <div className="description">{food.description}</div>

                        <button onClick={() => handleRemoveCartItem(food._id)}>Remove from Cart</button>
                    </div>
                    <div className="list-item-block-3">Price : {food.price}</div>
                </div>)}
            </div> : <h1>No Food Items right Now</h1>}
            <div className="total-wrapper">
                <div className="block-1">
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
                </div>
                 <div className="block-2"><button>Order Now</button></div>
            </div>
            <ResturantFooter />
        </div>
    )
}

export default CartDetails;