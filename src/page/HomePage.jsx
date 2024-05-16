import { Box, Button, CircularProgress, Grid, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import App from "../page/Carousel";

const searchApi = "your_search_api_endpoint_here";

const itemsPerPage = 9;

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [recipe, setRecipe] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const [filteredStores, setFilteredStores] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [allSubcategories, setAllSubcategories] = useState([]);
    const [hoveredButton, setHoveredButton] = useState(null);

    const handleSubcategoryHover = (subcategory) => {
        setHoveredButton(subcategory.id);
    };

    const handleSubcategoryLeave = () => {
        setHoveredButton(null);
    };

    useEffect(() => {
        axios
            .get(
                "https://api.express24.uz/client/v5/catalog/stores?latitude=41.311191&longitude=69.279776&limit=20&rootCategoryId=2"
            )
            .then((response) => {
                setStores(response.data.list);
                setFilteredStores(response.data.list);
                const subcategories = response.data.list.reduce((acc, store) => {
                    store.subCategories.forEach((subcategory) => {
                        if (!acc.some((item) => item.id === subcategory.id)) {
                            acc.push(subcategory);
                        }
                    });
                    return acc;
                }, []);
                setAllSubcategories(subcategories);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSubcategoryFilter = (subcategoryId) => {
        if (subcategoryId === selectedSubcategory) {
            setSelectedSubcategory(null);
            setFilteredStores(stores);
        } else {
            const filtered = stores.filter((store) =>
                store.subCategories.some((subcategory) => subcategory.id === subcategoryId)
            );
            setFilteredStores(filtered);
            setSelectedSubcategory(subcategoryId);
        }
    };

    const clearSubcategoryFilter = () => {
        setSelectedSubcategory(null);
        setFilteredStores(stores);
    };

    const searchRecipes = async () => {
        setIsLoading(true);
        const url = searchApi + query;
        const res = await fetch(url);
        const data = await res.json();
        setRecipe(data.meals);
        setIsLoading(false);
    };

    useEffect(() => {
        searchRecipes();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        searchRecipes();
    };

    const loadMore = () => {
        setLoading(true);

        setTimeout(() => {
            setCurrentPage((prevPage) => prevPage + 1);
            setLoading(false);
        }, 2000);
    };

    const navLinkStyle = {
        textDecoration: "none",
        color: "black",
    };

    return (
        <>
            <Box
                sx={{
                    margin: "0 auto",
                    maxWidth: "90%",
                    paddingTop: "3rem",
                    paddingBottom: "1rem",
                }}
            >
                <App />
            </Box>

            <Box sx={{ flexGrow: 1, maxWidth: "90%", margin: "auto" }}>
                <Box
                    sx={{
                        margin: "0 auto",
                        maxWidth: "90%",
                        paddingTop: "6rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <h1>Restorantlar</h1>
                </Box>

                <Box sx={{ flexGrow: 1, margin: "auto", maxWidth: "90%" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", height: "auto" }}>
                        {allSubcategories.slice(0, 8).map((subcategory) => (
                            <button
                                style={{
                                    width: "calc(12.5% - 5px)",
                                    height: "6vh",
                                    borderRadius: "10px",
                                    border: "none",
                                    backgroundColor:
                                        selectedSubcategory === subcategory.id
                                            ? "yellow"
                                            : hoveredButton === subcategory.id
                                                ? "#C0C0C0"
                                                : "#F5F5F5",
                                }}
                                key={subcategory.id}
                                onClick={() => handleSubcategoryFilter(subcategory.id)}
                                onMouseEnter={() => handleSubcategoryHover(subcategory)}
                                onMouseLeave={handleSubcategoryLeave}
                            >
                                {subcategory.name}
                            </button>
                        ))}
                    </div>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} spacing={0} marginTop={2}>
                        {filteredStores.slice(0, currentPage * itemsPerPage).map((restaurant, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <NavLink to={`/restaurant/${restaurant.id}`} style={navLinkStyle}>
                                    <Box marginBottom={4}>
                                        <Box
                                            width={"100%"}
                                            height={"330px"}
                                            bgcolor={"#fff"}
                                            borderRadius={"20px"}
                                            border={"none"}
                                            boxShadow={1}
                                            overflow="hidden"
                                        >
                                            <img
                                                style={{ width: "100%", height: "205px", objectFit: "cover" }}
                                                src={restaurant.cover}
                                                alt={restaurant.name}
                                            />
                                            <div style={{ padding: "10px", flexGrow: 1, fontSize: "12px" }}>
                                                <h2>{restaurant.name}</h2>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
                                                <Button
                                                    sx={{
                                                        backgroundColor: "#F5F5F5",
                                                        borderRadius: "50px",
                                                        width: "5px",
                                                        height: "27px",
                                                        color: "black",
                                                        marginTop: "10px",
                                                    }}
                                                >
                                                    4.6
                                                </Button>
                                            </div>
                                        </Box>
                                    </Box>
                                </NavLink>
                            </Grid>
                        ))}
                    </Grid>
                    {filteredStores.length > currentPage * itemsPerPage && (
                        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} width={"100%"}>
                            <Button
                                sx={{
                                    width: "90%",
                                    backgroundColor: "#E5E4E2",
                                    marginBottom: "5%",
                                    color: "black",
                                    flexGrow: 1,
                                    margin: "0 auto",
                                    maxWidth: "1144px",
                                    height: "45px",
                                    borderRadius: "10px",
                                }}
                                disabled={loading}
                                onClick={loadMore}
                            >
                                {loading ? <CircularProgress size={24} /> : "Yana koproq korsatish"}
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default HomePage;
