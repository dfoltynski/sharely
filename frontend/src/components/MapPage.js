import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import {
    Wrapper,
    LogoStyle,
    LogoContainer,
    FormContainer,
    InputText,
    InputSubmit,
    Form,
    SearchPanel,
    SearchInput,
    SearchIconStyle,
    SimpleButton,
    SendIconStyle,
    Markup,
    LogoutButton,
    Message,
    Name,
    Stars,
    TextArea,
} from "./styledcomponents";
import axios from "axios";

const api_url = "http://localhost:8080/api";

const MapPage = () => {
    const searchBar = useRef(null);
    const messageValue = useRef(null);
    const starsCount = useRef(null);
    const email = localStorage.getItem("email");
    const [showPopup, setShowPopup] = useState(false);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });
    const [pointsOnMap, setPointOnMap] = useState(null);

    const addPointOnMap = (e) => {
        e.preventDefault();
        console.log(messageValue.current.value);
        console.log(starsCount.current.value);
        messageValue.current.value = "";
        starsCount.current.value = null;
    };

    const auth = async () => {
        try {
            await axios.get(`${api_url}/auth-me`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
        } catch (err) {
            if (err) console.log(err);
            localStorage.clear();
            window.location = "/";
        }
    };

    useEffect(() => {
        auth();
    }, []);

    const searchLocation = (e) => {
        e.preventDefault();
        searchBar.current.value = "";
        console.log("looking for given location");
    };

    if (!localStorage.getItem("token")) {
        window.location = "/login";
    } else {
        return (
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/dziaddawid/ckd7lt760035c1ipfw4chnhi3"
                mapboxApiAccessToken="pk.eyJ1IjoiZHppYWRkYXdpZCIsImEiOiJja2EzMzRzZXMwN2ZoM2ZsOWFhZXdpeGt0In0.sRWxNOOhq4VLBER1For06g"
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                touchRotate={true}
                onClick={(e) => {
                    const [longitude, latitude] = e.lngLat;
                    setPointOnMap({ longitude, latitude });
                }}
            >
                <SearchPanel>
                    <Form onSubmit={searchLocation}>
                        <SearchInput
                            ref={searchBar}
                            placeholder="Enter location..."
                        ></SearchInput>
                        <SimpleButton
                            onClick={searchLocation}
                            style={{
                                position: "absolute",
                                right: "0",
                                backgroundColor: "#ffffff",
                                borderLeft: "solid 1px #EDEDED",
                            }}
                        >
                            <SendIconStyle></SendIconStyle>
                        </SimpleButton>
                    </Form>
                </SearchPanel>

                <LogoutButton
                    onClick={() => {
                        localStorage.clear();
                        window.location = "/";
                    }}
                >
                    Logout
                </LogoutButton>

                {pointsOnMap ? (
                    <>
                        <Marker
                            latitude={pointsOnMap.latitude}
                            longitude={pointsOnMap.longitude}
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
                            latitude={pointsOnMap.latitude}
                            longitude={pointsOnMap.longitude}
                            offsetLeft={-4}
                            offsetTop={15}
                            dynamicPosition={true}
                            closeButton={true}
                            closeOnClick={true}
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
                                        value="Dawid"
                                        disabled
                                        style={{ padding: "0.5em 1em" }}
                                    ></InputText>
                                    <TextArea
                                        ref={messageValue}
                                        placeholder="Tell something to the world..."
                                    ></TextArea>
                                    {/* replace with real stars */}
                                    <InputText
                                        ref={starsCount}
                                        type="number"
                                        max="5"
                                        min="0"
                                    ></InputText>
                                    {/* replace with real stars */}
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
                            {/* <Message>
                                <Name>Dawid</Name>
                                <Stars>* * * * *</Stars>
                                no zajebiscie bylo
                            </Message> */}
                        </Popup>
                    </>
                ) : null}

                <div style={{ position: "absolute", right: 0 }}>
                    <NavigationControl />
                </div>
            </ReactMapGL>
        );
    }
};
export default MapPage;
