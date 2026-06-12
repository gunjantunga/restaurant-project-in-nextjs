"use client"
import { useState } from "react"
import ResturantHeader from "@/app/_components/ResturantHeader";
import "../style.css";
import AddFoodItems from "@/app/_components/AddFoodItems";

function Dashboard() {

    const [addFoodItems, setAddFoodItems] = useState(false);

    return (
        <>
            <ResturantHeader />
            <button onClick={() => setAddFoodItems(true)} >Add Food</button>
            <button onClick={() => setAddFoodItems(false)} >Dashboard</button>
            {addFoodItems ? <AddFoodItems /> : <h2>Welcome to Dashboard page</h2>}
        </>
    )
}

export default Dashboard;