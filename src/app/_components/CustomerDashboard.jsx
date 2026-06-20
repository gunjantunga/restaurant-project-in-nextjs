"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../resturant/style.css";


function CustomerDashboard({ cartDetails }) {


    const [cartCount, setCartCount] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    useEffect(() => {
        if (!cartDetails) return;

        // Get latest cart from localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // If cart is empty
        if (cart.length === 0) {
            cart = [cartDetails];
        }
        // Same restaurant
        else if (cart[0].resto_id === cartDetails.resto_id) {

            // Prevent duplicate items
            const exists = cart.some(item => item._id === cartDetails._id);

            if (!exists) {
                cart.push(cartDetails);
            }
        }
        // Different restaurant
        else {
            cart = [cartDetails];
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItem(cart);
        setCartCount(cart.length);

    }, [cartDetails]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItem(items);
        setCartCount(items.length);
    }, []);


    return (

        <div className='header-wrapper'>
            <div className="logo">
                <img
                    src="https://thumbs.dreamstime.com/b/food-delivery-logo-design-template-134749604.jpg"
                    alt="logo"
                    width={50}
                    height={50}
                />
            </div>
            <ul>
                <li><Link href="/">Login</Link></li>
                <li><Link href="/">SignUp</Link></li>
                <li><Link href="/">Cart ({cartCount ? cartCount : 0})</Link></li>
                <li><Link href="/">Profile</Link></li>
            </ul>
        </div>
    )
}

export default CustomerDashboard;