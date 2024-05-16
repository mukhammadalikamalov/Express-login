import { Box } from "@mui/material";
import React from "react";
import ButtonAppBar from "./Header";
import Footer from "../layout/Footer";

const Layout = (props) => {
    const { children } = props;
    return (
        <div>
            <ButtonAppBar />
            <Box sx={{ marginTop: "2%" }}>{children}</Box>
            <Footer />
        </div>
    );
};

export default Layout;
