import axios from "axios";
import React, { useEffect, useState } from "react";

function Private() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.express24.uz/client/v5/catalog/stores?latitude=41.311191&longitude=69.279776&limit=20&rootCategoryId=2"
      );
      setRestaurants(response.data.list);
      setFilteredRestaurants(response.data.list);
      const uniqueCategories = response.data.list.reduce((acc, restaurant) => {
        restaurant.subCategories.forEach((subcategory) => {
          if (!acc.includes(subcategory.name)) {
            acc.push(subcategory.name);
          }
        });
        return acc;
      }, []);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCategoryFilter = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.subCategories.some((subcategory) => subcategory.name === category)
      );
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <>
      <>
        <h1>Restaurants</h1>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => handleCategoryFilter("All")}
            className={activeCategory === "All" ? "active-category-button" : "category-button"}
          >
            All Categories
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryFilter(category)}
              className={activeCategory === category ? "active-category-button" : "category-button"}
            >
              {category}
            </button>
          ))}
        </div>

        <>
          {filteredRestaurants.map((restaurant, index) => (
            <>
              <>
                <
                >
                  <img style={{ width: "100%", height: "20vh" }} src={restaurant.cover} alt={restaurant.name} />
                  <div style={{ padding: "10px", flexGrow: 1 }}>
                    <h2>{restaurant.name}</h2>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                    
                    <div
                      style={{
                        width: "40%",
                        height: "5vh",
                        backgroundColor: "#00FF40",
                        borderRadius: "40px",
                        textAlign: "center", // Updated textAlign
                        color: "white",
                        fontSize: "20px",
                        paddingTop: "6px",
                      }}
                    >
                      {restaurant.id}
                    </div>
                    
                  </div>
                </>
              </>
            </>
          ))}
        </>
      </>
    </>
  );
}

export default Private;
