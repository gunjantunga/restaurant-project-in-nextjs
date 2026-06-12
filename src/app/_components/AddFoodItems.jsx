
import React, { useState } from 'react';
function AddFoodItems() {

    const [foodData, setFoodData] = useState({
        name: "",
        price: "",
        imagePath: "",
        description: ""
    })
    const [error, setError] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;
        setFoodData({
            ...foodData,
            [name]: value
        })
    }


    return (
        <div className="container">
            <h2>Add Food Items</h2>
            <div className="input-wrapper">

                <input name="name" value={foodData.name} onChange={handleChange} type="text" placeholder="Enter Food Name" className="input-field" />
            </div>
            <div className="input-wrapper">

                <input name="price" value={foodData.price} onChange={handleChange} type="text" placeholder="Enter price" className="input-field" />
            </div>
            <div className="input-wrapper">

                <input name="imagePath" type="text" value={foodData.imagePath} onChange={handleChange} placeholder="Enter image path" className="input-field" />
            </div>
            <div className="input-wrapper">

                <input name="description" type="text" value={foodData.description} onChange={handleChange} placeholder="Enter Description" className="input-field" />
            </div>
            <button className="button">Add Food item</button>
        </div >
    )
}

export default AddFoodItems;