import ReactDOM from "react-dom"

import App from './App'
import { applyMiddleware, createStore } from "redux"
import reducers from "./redux/reducers/index"
import thunk from "redux-thunk"

import logger from "redux-logger"
// import promise from "redux-promise-middleware"
import { Provider } from "react-redux"

const middleware = applyMiddleware(
    // promise,
    thunk,
    // logger,
)

const store = createStore(reducers, middleware)

// const RootWithSession = withSession(Root)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
