import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import React, { Fragment } from "react";

import SearchCharactersPage from "./components/SearchCharacters/SearchCharactersPage";
import CharacterPage from "./components/Character/CharacterPage";
import HomePage from "./components/Characters/HomePage";
import Page404 from "./components/Page404";
import Footer from "./components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => (
    <div id='app'>
        <BrowserRouter>
            <Fragment>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/search" exact component={SearchCharactersPage} />
                    <Route path="/characters/:id" exact component={CharacterPage} />
                    <Route path="/404" exact component={Page404} />
                    <Redirect to="/404" />
                </Switch>
                <Footer />
            </Fragment>
        </BrowserRouter>
    </div>
);

export default App;
