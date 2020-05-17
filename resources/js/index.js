import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
// import promise from "redux-promise-middleware";
import { Provider } from "react-redux";
import reducers from "./redux/reducers/index";

import SearchCharactersPage from "./components/SearchCharacters/SearchCharactersPage";
import CharacterPage from "./components/Character/CharacterPage";
import HomePage from "./components/Characters/HomePage";
import Page404 from "./components/Page404";
import Footer from "./components/Footer";

const middleware = applyMiddleware(
    // promise,
    thunk,
    logger,
);
const store = createStore(reducers, middleware);

const Root = () => (
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

// const RootWithSession = withSession(Root);

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
