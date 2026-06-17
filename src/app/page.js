"use client"
import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import CustomerDashboard from "./_components/CustomerDashboard";
import ResturantFooter from "./_components/ResturantFooter";

export default function Home() {

  const [inputSearch, setInputSearch] = useState("");
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);



  const handleSearchCities = (e) => {
    let value = e.target.value
    setInputSearch(value);
    if (value.length === 0) {
      setFilteredCities([]);
      fetchRestaurants({})
    } else {
      let city = cities.filter((city) => city.toLowerCase().includes(value.toLowerCase()));
      setFilteredCities(city);
    }

  }


  const fetchCities = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/customer/location");
      response = await response.json();
      setCities(response.result);
    } catch (err) {
      console.error(err);
    }
  }

  const selectCity = (city) => {
    setSelectedCity(city)
    setInputSearch(city);
    setFilteredCities([]);
    fetchRestaurants({
      location: city,
      restaurant: restaurantSearch,
    });
  }


  const handleRestaurantSearch = (e) => {
    const value = e.target.value;

    setRestaurantSearch(value);

    if (value.trim() === "") {
      fetchRestaurants({
        location: selectedCity,
      });
    } else {
      betterfunc({
        restaurant: value,
        location: selectedCity,
      });
    }
  };

  const fetchRestaurants = async ({ location, restaurant } = {}) => {
    try {
      let url = "http://localhost:3000/api/customer";

      const params = new URLSearchParams();

      if (location) {
        params.append("location", location);
      }

      if (restaurant) {
        params.append("restaurant", restaurant);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      let response = await fetch(url);
      response = await response.json();

      setRestaurants(response.result);
    } catch (err) {
      console.error(err);
    }
  };


  function debounce(func, delay) {

    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }


  const betterfunc = debounce(fetchRestaurants, 500);

  useEffect(() => {
    fetchCities();
    fetchRestaurants({})
  }, []);

  return (
    <div className={styles.page}>
      <CustomerDashboard />
      <div className="main-page-banner">

        <h1>Food Delivery App</h1>
        <div className="input-wrapper">

          <input
            type="text"
            value={inputSearch}
            onChange={(e) => handleSearchCities(e)}
            className="select-input"
            placeholder="Select Place"
          />
          <ul className="location-list">
            {filteredCities.map((city) => <li key={city} onClick={() => selectCity(city)}>{city}</li>)}
          </ul>

          <input type="text" value={restaurantSearch}
            onChange={handleRestaurantSearch} className="search-input" placeholder="Enter food or Restaurant name" />
        </div>
      </div>
      <div className="resturant-list-container">
        {
          restaurants.map((restaurant) => (
            <div className="resturant-wrapper" key={restaurant._id}>
              <div className="heading-wrapper">
                <h3>{restaurant.resturantName}</h3>
                <h5>Contact : {restaurant.contactNumber}</h5>
              </div>
              <div className='address-wrapper'>
                <div>{restaurant.city}{" "},</div>
                <div>{restaurant.address} , Email: {restaurant.email}</div>
              </div>
            </div>
          ))}
      </div>
      <ResturantFooter />
    </div>
  );
}
