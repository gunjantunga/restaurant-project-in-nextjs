"use client"
import { useEffect, useState } from "react";
import CustomerDashboard from "../_components/CustomerDashboard";
import ResturantFooter from "../_components/ResturantFooter";

function MyProfile() {

    const [myOrders, setMyOrders] = useState([]);


    const getMyOrders = async () => {
        const userStorage = JSON.parse(localStorage.getItem("user"));
        let response = await fetch(`http://localhost:3000/api/order?id=${userStorage._id}`);
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result)
        }
    }

    useEffect(() => {
        getMyOrders();
    }, [])

    return (
        <div>
            <CustomerDashboard />
            {myOrders.map((item, index) => (<div
                className="resturant-wrapper"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                key={index}
            >
                <h4>Name : {item.resturantName}</h4>
                <div>Amount : {item.amount}</div>
                <div>Address : {item.address}</div>
                <div>Status : {item.status}</div>
            </div>))}
            <ResturantFooter />
        </div>
    )
}

export default MyProfile;

//