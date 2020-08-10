import React from "react";
import { Switch, Route } from "react-router-dom";
import { LoginPage, RegisterPage, MapPage, LandingPage } from "./components";
import { Wrapper } from "./components/styledcomponents";

function App() {
    return (
        <Wrapper>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/map" component={MapPage} />
                <Route>
                    <h1>404</h1>
                </Route>
            </Switch>
        </Wrapper>
    );
}

export default App;
