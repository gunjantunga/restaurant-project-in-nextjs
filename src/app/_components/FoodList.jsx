
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function FoodListItem() {


    const [foodItems, setFoodItems] = useState([]);
    const route = useRouter();

    useEffect(() => {
        getFoodByRestaurant();
    }, []);


    const getFoodByRestaurant = async () => {

        let localData = localStorage.getItem("resturantUser");
        localData = JSON.parse(localData);
        try {

            let response = await fetch(`http://localhost:3000/api/food/${localData?._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            response = await response.json();
            if (response.success) {
                setFoodItems(response.result);
            }
        } catch (error) {
            console.error(error);
        }


    }


    const deleteFoodItem = async (id) => {
        try {
            let response = await fetch(`http://localhost:3000/api/food/${id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            response = await response.json();
            if (response.success) {
                alert("Food item deleted successfully");
                getFoodByRestaurant();
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            {foodItems.length > 0 ?
                <div>
                    <h2>Food Items</h2>
                    <table>
                        <thead>

                            <tr>
                                <th>Sl.No</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodItems.map((item, index) => (

                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td><img src={item.img_path} alt="" width={50} height={50} /></td>
                                    <td>{item.description}</td>
                                    <td><button onClick={() => deleteFoodItem(item._id)}>Delete</button><button onClick={()=> route.push(`/resturant/dashboard/${item._id}`)}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : <div>Loading...</div>}
        </>
    )
}

export default FoodListItem;