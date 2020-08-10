import React, { useState, useEffect, useRef } from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl";
import axios from "axios";
import socketIOClient from "socket.io-client";

import {
    FormContainer,
    InputText,
    InputSubmit,
    Form,
    Markup,
    LogoutButton,
    TextArea,
    MessageBox,
    StarSolidStyle,
    Loading,
    Wrapper,
} from "./styledcomponents";

const api_url = "http://localhost:8080/api";
const ENDPOINT = "http://127.0.0.1:8080";
const socket = socketIOClient(ENDPOINT);

const MapPage = () => {
    const messageValue = useRef(null);
    const starsCount = useRef(null);
    const locationValue = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [showPopup, setShowPopup] = useState(true);
    const [showMessage, setShowMessage] = useState({});
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 45.13600772929895,
        longitude: 9.409537429857792,
        zoom: 2.6,
    });
    const [lnglats, setLnglats] = useState(null);
    const [markups, setMarkups] = useState([]);

    const auth = async () => {
        try {
            let res = await axios.get(`${api_url}/auth-me`, {
                headers: {
                    "Authorization": `Bearer ${
                        document.cookie.match(/ey.*/g)[0]
                    }`,
                },
            });
            setName(res.data.name);
        } catch (err) {
            if (err) console.log(err);
            document.cookie.split(";").forEach(function (c) {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(
                        /=.*/,
                        "=;expires=" + new Date().toUTCString() + ";path=/"
                    );
            });
            window.location = "/";
        }
    };

    const getAllMarkups = async () => {
        let res = await axios.get(`${api_url}/list-all-markups`);
        setMarkups(res.data.info[0].markup);
    };

    const addPointOnMap = (e) => {
        e.preventDefault();

        // const socket = socketIOClient(ENDPOINT);

        const markup = {
            name,
            where: locationValue.current.value,
            lnglats,
            comments: messageValue.current.value,
            stars: starsCount.current.value,
        };

        socket.emit("addMarkup", markup);

        axios.post(`${api_url}/push-pins-to-db`, {
            name,
            where: locationValue.current.value,
            lnglats,
            comments: messageValue.current.value,
            stars: starsCount.current.value,
        });

        setMarkups([
            ...markups,
            {
                name,
                where: locationValue.current.value,
                lnglats,
                comments: messageValue.current.value,
                stars: starsCount.current.value,
            },
        ]);

        messageValue.current.value = "";
        starsCount.current.value = null;
        setShowPopup(false);
    };

    const onSelected = (viewportt, item) => {
        setViewport(viewportt);
    };

    socket.on("pushMarkup", (markup) => {
        console.log("pushMarkup");

        setMarkups([...markups, markup]);
    });

    useEffect(() => {
        auth();
        getAllMarkups();
    }, []);

    if (!document.cookie.match(/ey.*/g)) {
        window.location = "/login";
    } else {
        return (
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/dziaddawid/ckdngdixm27l01in4ud1z8kpc"
                mapboxApiAccessToken="pk.eyJ1IjoiZHppYWRkYXdpZCIsImEiOiJja2EzMzRzZXMwN2ZoM2ZsOWFhZXdpeGt0In0.sRWxNOOhq4VLBER1For06g"
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                touchRotate={true}
                onDblClick={(e) => {
                    const [longitude, latitude] = e.lngLat;
                    setLnglats({ longitude, latitude });
                    setShowPopup(true);
                }}
                onLoad={(e) => setIsLoading(false)}
            >
                {isLoading ? (
                    <Wrapper
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Loading />
                    </Wrapper>
                ) : (
                    <>
                        <Geocoder
                            mapboxApiAccessToken="pk.eyJ1IjoiZHppYWRkYXdpZCIsImEiOiJja2EzMzRzZXMwN2ZoM2ZsOWFhZXdpeGt0In0.sRWxNOOhq4VLBER1For06g"
                            onSelected={onSelected}
                            viewport={viewport}
                            hideOnSelect={true}
                            limit={10}
                        />
                        <LogoutButton
                            onClick={() => {
                                // localStorage.clear();
                                document.cookie
                                    .split(";")
                                    .forEach(function (c) {
                                        document.cookie = c
                                            .replace(/^ +/, "")
                                            .replace(
                                                /=.*/,
                                                "=;expires=" +
                                                    new Date().toUTCString() +
                                                    ";path=/"
                                            );
                                    });
                                window.location = "/";
                            }}
                        >
                            Logout
                        </LogoutButton>
                        {lnglats && showPopup ? (
                            <>
                                <Marker
                                    latitude={lnglats.latitude}
                                    longitude={lnglats.longitude}
                                    offsetLeft={-20}
                                    offsetTop={-10}
                                >
                                    <Markup
                                        onClick={() => setShowPopup(!showPopup)}
                                        style={{
                                            height: `${3 * viewport.zoom}px`,
                                            width: `${3 * viewport.zoom}px`,
                                        }}
                                    ></Markup>
                                </Marker>
                                <Popup
                                    latitude={lnglats.latitude}
                                    longitude={lnglats.longitude}
                                    offsetLeft={-4}
                                    offsetTop={15}
                                    dynamicPosition={true}
                                    closeButton={true}
                                    closeOnClick={false}
                                    onClose={() => setShowPopup(false)}
                                    anchor="top"
                                    style={{
                                        height: `${3 * viewport.zoom}px`,
                                        width: `${3 * viewport.zoom}px`,
                                    }}
                                >
                                    <FormContainer>
                                        <Form onSubmit={addPointOnMap}>
                                            <InputText
                                                value={name}
                                                disabled
                                                style={{ padding: "0.5em 1em" }}
                                            ></InputText>
                                            <InputText
                                                ref={locationValue}
                                                placeholder="Where have you been?"
                                            ></InputText>
                                            <TextArea
                                                ref={messageValue}
                                                placeholder="Tell something to the world..."
                                            ></TextArea>
                                            <InputText
                                                ref={starsCount}
                                                type="number"
                                                placeholder="Rate 1-5 star"
                                                max="5"
                                                min="1"
                                            ></InputText>
                                            <InputSubmit
                                                value="Share"
                                                style={{
                                                    color: "#ffffff",
                                                    fontWeight: "bold",
                                                    background:
                                                        "linear-gradient(90deg, #11998E 0%, #38EF7D 100%), #47BA67",
                                                }}
                                            ></InputSubmit>
                                        </Form>
                                    </FormContainer>
                                </Popup>
                            </>
                        ) : null}
                        {markups.map((markup, index) => (
                            <React.Fragment key={index}>
                                <Marker
                                    latitude={markup.lnglats.latitude}
                                    longitude={markup.lnglats.longitude}
                                >
                                    <Markup
                                        onClick={() =>
                                            setShowMessage({
                                                [index]: !showMessage[index],
                                            })
                                        }
                                        style={{
                                            zIndex: "-1",
                                            height: `${3 * viewport.zoom}px`,
                                            width: `${3 * viewport.zoom}px`,
                                        }}
                                    ></Markup>
                                    {showMessage[index] ? (
                                        <MessageBox>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {markup.name}
                                            </div>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {markup.where}
                                            </div>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    backgroundColor: "#ebebeb",
                                                    borderRadius: "6px",
                                                    border: "none",
                                                    padding: "1em 2em",
                                                    fontSize: "18px",
                                                    margin: "0.2em 0",
                                                    boxShadow:
                                                        "0px 0px 4px rgba(0, 0, 0, 0.25)",
                                                }}
                                            >
                                                {markup.comments}
                                            </div>
                                            <div
                                                style={{ flexDirection: "row" }}
                                            >
                                                {[
                                                    ...Array(
                                                        Number(markup.stars)
                                                    ),
                                                ].map((v, i) => (
                                                    <span key={i}>
                                                        <StarSolidStyle />
                                                    </span>
                                                ))}
                                            </div>
                                        </MessageBox>
                                    ) : null}
                                </Marker>
                            </React.Fragment>
                        ))}
                        <div style={{ position: "absolute", right: 0 }}>
                            <NavigationControl />
                        </div>
                    </>
                )}
            </ReactMapGL>
        );
    }
};

export default MapPage;
