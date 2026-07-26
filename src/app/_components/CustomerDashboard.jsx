"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../resturant/style.css";
import { useRouter } from "next/navigation";


function CustomerDashboard({ cartDetails, removeCartData }) {


    const [cartCount, setCartCount] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [userData, setUserData] = useState({});
    const route = useRouter();

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
        const user = JSON.parse(localStorage.getItem("user")) || undefined;
        setUserData(user);
        setCartItem(items);
        setCartCount(items.length);
    }, []);


    useEffect(() => {

        if (!removeCartData) return;

        const remainingItems = cartItem.filter(
            item => item._id !== removeCartData
        );

        if (remainingItems.length === 0) {
            localStorage.removeItem("cart");
        } else {
            localStorage.setItem("cart", JSON.stringify(remainingItems));
        }

        setCartItem(remainingItems);
        setCartCount(remainingItems.length);

    }, [removeCartData]);

    const logout=()=>{
        localStorage.removeItem("user");
        route.push("/user-auth");
    }

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
                <li><Link href="/">Home</Link></li>
                {userData ? <>
                    <li><Link href="/">{userData?.name}</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                </> : 
                <>
                    <li><Link href="/">Login</Link></li>
                    <li><Link href="/user-auth">SignUp</Link></li>
                </>}
                <li><Link href={cartCount ? "/cart" : "#"}>Cart ({cartCount ? cartCount : 0})</Link></li>
                <li><Link href="/">Add Restaurant</Link></li>
            </ul>
        </div>
    )
}

export default CustomerDashboard;