import React from "react";
import { LogoStyle, LogoContainer } from "./styledcomponents";
import { Link } from "react-router-dom";

const GoBackHome = () => {
    return (
        <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
            <LogoContainer>
                <LogoStyle></LogoStyle>
                sharely
            </LogoContainer>
        </Link>
    );
};

export default GoBackHome;
