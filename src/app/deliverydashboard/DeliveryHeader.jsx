
"use client";
import { useEffect } from "react";
import Link from "next/link"
import "../resturant/style.css";
import { useRouter } from "next/navigation";

function DeliveryDashboard() {

    const route = useRouter();

    useEffect(() => {
        let delivery = JSON.parse(localStorage.getItem("delivery"));
        if (!delivery) {
            route.push("/deliverypartner");
        }
    }, [])

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
            </ul>
        </div>
    )
}

export default DeliveryDashboard;