import React from "react";
import { Link } from "react-router-dom";
import {
    Wrapper,
    LogoContainer,
    LogoStyle,
    SimpleButton,
} from "./styledcomponents";

const LandingPage = () => {
    return (
        <Wrapper>
            <LogoContainer>
                <LogoStyle></LogoStyle>
                sharely
            </LogoContainer>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Link to="/login">
                    <SimpleButton
                        style={{
                            padding: " 0.75em 2em",
                            background:
                                "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%), #c64b4b",
                            fontSize: "36px",
                            fontWeight: "bold",
                            color: "#ffffff",
                            marginTop: "0.5em",
                            marginRight: "0.5em",
                            borderRadius: "6px",
                        }}
                    >
                        Login
                    </SimpleButton>
                </Link>
                <Link to="/register">
                    <SimpleButton
                        style={{
                            padding: " 0.75em 2em",
                            background:
                                "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%), #c64b4b",
                            fontWeight: "bold",
                            fontSize: "36px",
                            color: "#ffffff",
                            marginTop: "0.5em",
                            borderRadius: "6px",
                        }}
                    >
                        Register
                    </SimpleButton>
                </Link>
            </div>
        </Wrapper>
    );
};

export default LandingPage;
