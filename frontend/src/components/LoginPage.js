import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Wrapper,
    LogoStyle,
    LogoContainer,
    FormContainer,
    InputText,
    InputSubmit,
    Form,
    SimpleButton,
} from "./styledcomponents";

const LoginPage = () => {
    const [invalidData, setInvalidData] = useState(false);

    const email = useRef();
    const password = useRef();

    const Login = async (e) => {
        try {
            const api_url = "http://localhost:8080/api";

            e.preventDefault();
            let res = await axios.post(`${api_url}/login`, {
                email: email.current.value,
                password: password.current.value,
            });

            localStorage.setItem("email", email.current.value);
            localStorage.setItem("token", res.data.token);
            setInvalidData(false);
            window.location = "/map";
        } catch (err) {
            setInvalidData(true);
            console.log(err);
        }
    };

    if (localStorage.getItem("token")) {
        window.location = "/map";
    } else {
        return (
            <Wrapper>
                <LogoContainer>
                    <LogoStyle></LogoStyle>
                    sharely
                </LogoContainer>

                <FormContainer>
                    <Form onSubmit={Login}>
                        {invalidData ? (
                            <small>
                                <span style={{ color: "red" }}>
                                    <b>invalid email or password</b>
                                </span>
                            </small>
                        ) : null}
                        <InputText
                            ref={email}
                            style={{ color: "#000000" }}
                            placeholder="email"
                        />

                        <InputText
                            ref={password}
                            style={{ color: "#000000" }}
                            placeholder="password"
                            type="password"
                        />
                        <InputSubmit
                            type="textarea"
                            style={{
                                color: "#ffffff",
                                fontWeight: "bold",
                                background:
                                    "linear-gradient(90deg, #11998E 0%, #38EF7D 100%), #47BA67",
                            }}
                            value="Login"
                        />
                        <Link to="/register">
                            <SimpleButton
                                style={{
                                    padding: " 0.75em 2em",
                                    background:
                                        "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%), #c64b4b",
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    marginTop: "0.5em",
                                    borderRadius: "6px",
                                }}
                            >
                                Register
                            </SimpleButton>
                        </Link>
                    </Form>
                </FormContainer>
            </Wrapper>
        );
    }
};

export default LoginPage;
