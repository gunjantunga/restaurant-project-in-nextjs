"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
function UpdateFoodItem() {
    const [foodData, setFoodData] = useState({
        name: "",
        price: "",
        imagePath: "",
        description: ""
    })
    const { id } = useParams();
    const route = useRouter();
    const [error, setError] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFoodData({
            ...foodData,
            [name]: value
        })
    }


    const getFoodById = async () => {

        try {
            const response = await fetch(`http://localhost:3000/api/food/edit/${id}`);
            const {result,success} = await response.json();
            if(success){

                setFoodData({
                    name: result.name,
                    price: result.price,
                    imagePath: result.img_path,
                    description: result.description,
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const validateData = () => {
        let error = {};
        let isError = true;

        if (!foodData.name) {
            error.name = "Name is required";
            isError = false;
        }
        if (!foodData.price) {
            error.price = "Price is required";
            isError = false;
        }
        if (!foodData.imagePath) {
            error.imagePath = "Image path is required";
            isError = false;
        }
        if (!foodData.description) {
            error.description = "Description is required";
            isError = false;
        }
        setError(error);
        return isError;
    }

    const handleUpdate = async () => {
        if (!validateData()) {
            return;
        }

        try {

            let localData = JSON.parse(localStorage.getItem("resturantUser"));
            const {
                name,
                price,
                description,
                imagePath,
            } = foodData;
            let response = await fetch(`http://localhost:3000/api/food/edit/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    price,
                    description,
                    img_path: imagePath,
                    resto_id: localData?._id || ""
                }),
            });
            response = await response.json();
            if (response.success) {
                alert("Food item Updated successfully");
                setFoodData({
                    name: "",
                    price: "",
                    imagePath: "",
                    description: ""
                })
                route.push("/resturant/dashboard");
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        getFoodById();
    }, [])
    return (
        <>

            <div className="container">
                <h2>Update Food Item</h2>
                <div className="input-wrapper">
                    <input name="name" value={foodData.name} onChange={handleChange} type="text" placeholder="Enter Food Name" className="input-field" />
                </div>
                {error.name && <span style={{ color: "red" }}>{error.name}</span>}
                <div className="input-wrapper">
                    <input name="price" value={foodData.price} onChange={handleChange} type="text" placeholder="Enter price" className="input-field" />
                </div>
                {error.price && <span style={{ color: "red" }}>{error.price}</span>}
                <div className="input-wrapper">
                    <input name="imagePath" type="text" value={foodData.imagePath} onChange={handleChange} placeholder="Enter image path" className="input-field" />
                </div>
                {error.imagePath && <span style={{ color: "red" }}>{error.imagePath}</span>}
                <div className="input-wrapper">
                    <input name="description" type="text" value={foodData.description} onChange={handleChange} placeholder="Enter Description" className="input-field" />
                </div>
                {error.description && <span style={{ color: "red" }}>{error.description}</span>}
                <div>

                    <button onClick={handleUpdate} className="button">Update Food Item</button>
                    <button onClick={() => route.push("/resturant/dashboard")} className="button">Cancel</button>
                </div>
            </div >
        </>
    )
}

export default UpdateFoodItem;