import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../App";
import RestaurantById from "../page/[id]";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantById />} />
        </Routes>
    );
};

export default Router;
