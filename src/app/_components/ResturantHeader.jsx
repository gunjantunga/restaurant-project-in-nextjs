"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from "next/navigation";
function ResturantHeader() {

    const [details, setDetails] = useState({});
    const route = useRouter();
    const pathname = usePathname();
    useEffect(() => {

        let data = localStorage.getItem("resturantUser");
            data = JSON.parse(data);
        if (data && pathname === "/resturant") {
            route.push("/resturant/dashboard");
        } else if (!data && pathname === "/resturant/dashboard") {
            route.push("/resturant");
        }else{
            setDetails(data);
        }

    }, [])

    const logout=()=>{
        localStorage.removeItem("resturantUser");
        route.push("/resturant");
    }
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
                <li><Link href="/">Home</Link></li>
                {details && details.email ? <>
                    <li><Link href="/profile">Profile</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                </> : <li><Link href="/resturant">Login/SignUp</Link></li>}
            </ul>
        </div>
    )
}

export default ResturantHeader;