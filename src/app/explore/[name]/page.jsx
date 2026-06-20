'use client';
import { useParams, useSearchParams } from "next/navigation";
import CustomerDashboard from "@/app/_components/CustomerDashboard";
import { useEffect, useState } from "react";
import ResturantFooter from "@/app/_components/ResturantFooter";
import "../../globals.css";

function RestaurantFoodExplore() {

    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [foodItems, setFooItems] = useState([]);
    const [cartDetails, setCartDetails] = useState(null);

    const { name } = useParams();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    async function getAllFoodsByRestaurant() {

        try {

            let details = await fetch(`http://localhost:3000/api/customer/${id}`);

            let result = await details.json();

            if (result.success) {
                setRestaurantDetails(result.restaurant);
                setFooItems(result.foodItems);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllFoodsByRestaurant();
    }, [])


    const addToCart = (item) => {
        setCartDetails(item);
    }


    return (
        <div>
            <CustomerDashboard cartDetails={cartDetails}/>
            <div className="food-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="restaurant-details-wrapper">
                <h4>Contact: {restaurantDetails?.contactNumber}</h4>
                <h4>City: {restaurantDetails?.city}</h4>
                <h4>Address: {restaurantDetails?.address}</h4>
                <h4>Email: {restaurantDetails?.email}</h4>
            </div>
            {foodItems.length > 0 ? <div className="food-item-wrapper">
                {foodItems.map((food) => <div className="list-item" key={food?._id}>
                    <div><img src={food.img_path} width={100} style={{ marginRight: 15 }} /></div>
                    <div>
                        <div>{food.name}</div>
                        <div>{food.price}</div>
                        <div className="description">{food.description}</div>
                        <button onClick={() => addToCart(food)}>Add To Cart</button>
                    </div>
                </div>)}
            </div> : <h1>No Food Items right Now</h1>}
            <ResturantFooter />
        </div>
    )
}

export default RestaurantFoodExplore;