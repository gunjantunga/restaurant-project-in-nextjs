import React from "react";
import Link from "next/link";
import Image from "next/image";
import "../resturant/style.css";


function CustomerDashboard() {

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
                <li><Link href="/">Cart</Link></li>
                <li><Link href="/">Profile</Link></li>
            </ul>
        </div>
    )
}

export default CustomerDashboard;