import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GoBackHome from "./GoBackHome";
import {
    Wrapper,
    FormContainer,
    InputText,
    InputSubmit,
    Form,
    SimpleButton,
} from "./styledcomponents";

const RegisterPage = () => {
    const api_url = "http://localhost:8080/api";

    const [wrongEmail, setWrongEmail] = useState(false);
    const [shortName, setShortName] = useState(false);
    const [shortPassword, setShortPassword] = useState(false);

    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);

    const validateLength = (e) => {
        if (e.target.type === "password") {
            if (e.target.value.length > 3) {
                setShortPassword(false);
                console.log("password git");
            } else {
                setShortPassword(true);
            }
        } else {
            if (e.target.value.length > 3) {
                setShortName(false);
                console.log("name git");
            } else {
                setShortName(true);
            }
        }
    };

    const validateEmail = (e) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // It's not mine...
        const emailMatch = re.test(e.target.value);

        emailMatch ? setWrongEmail(false) : setWrongEmail(true);
    };

    const Register = async (e) => {
        e.preventDefault();

        if (
            email.current.value.length > 0 &&
            name.current.value.length > 3 &&
            name.current.value.length < 30 &&
            password.current.value.length > 3
        ) {
            if (wrongEmail || shortName || shortPassword) {
                console.log("incorrect data");
            } else {
                try {
                    let res = await axios.post(`${api_url}/register`, {
                        name: name.current.value,
                        email: email.current.value,
                        password: password.current.value,
                    });
                    console.log(res);
                    document.cookie = `token=${res.data.token}`;
                    window.location = "/map";
                } catch (err) {
                    console.log(err);
                }
            }
        } else {
            console.log("incorrect data");
        }
    };

    if (document.cookie.match(/ey.*/g)) {
        window.location = "/map";
    } else {
        return (
            <Wrapper>
                <GoBackHome />

                <FormContainer>
                    <Form onSubmit={Register}>
                        <InputText
                            style={{ color: "#000000" }}
                            ref={name}
                            placeholder="name"
                            onChange={validateLength}
                        />

                        {shortName ? (
                            <small>
                                <span style={{ color: "red" }}>
                                    <b>
                                        name length must be greater than 3 and
                                        lower than 30
                                    </b>
                                </span>
                            </small>
                        ) : null}

                        <InputText
                            ref={email}
                            style={{ color: "#000000" }}
                            placeholder="email"
                            onChange={validateEmail}
                        />

                        {wrongEmail ? (
                            <small>
                                <span style={{ color: "red" }}>
                                    <b>invalid email</b>
                                </span>
                            </small>
                        ) : null}

                        <InputText
                            ref={password}
                            style={{ color: "#000000" }}
                            placeholder="password"
                            type="password"
                            onChange={validateLength}
                        />

                        {shortPassword ? (
                            <small>
                                <span style={{ color: "red" }}>
                                    <b>
                                        password length must be greater than 3
                                    </b>
                                </span>
                            </small>
                        ) : null}
                        <InputSubmit
                            style={{ color: "#ffffff", fontWeight: "bold" }}
                            value="Register"
                        />
                        <Link to="/login">
                            <SimpleButton
                                style={{
                                    padding: " 0.75em 2em",
                                    background:
                                        "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%), #c64b4b",
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
                    </Form>
                </FormContainer>
            </Wrapper>
        );
    }
};

export default RegisterPage;
