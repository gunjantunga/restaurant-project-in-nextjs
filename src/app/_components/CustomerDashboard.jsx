import React from "react";
import Link from "next/link";
import Image from "next/image";
import "../resturant/style.css";


function CustomerDashboard() {

    return (

        <div className='header-wrapper'>
            <div className="logo">
                <Image
                    src="/pexels-n-voitkevich-8939518.png"
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