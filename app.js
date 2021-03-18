const { helpersConfig } = require("./config");

const cookieParser = require("cookie-parser");
const express = require("express");
const csurf = require("csurf");
const path = require('path');
const app = express();

const csrfProtection = csurf({ cookie: true });

/** @constant {object} */
const middleware = {
    csrfProtection,
    handleCsrfError: (err, req, res, next) => {
        if (err.code !== "EBADCSRFTOKEN") return next(err);

        res.status(403);
        res.send("Unsuccessful");
    }
};

app.use(express.static(path.join(process.cwd(), "frontend/build")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get(
    "/", 
    middleware.csrfProtection, 
    (req, res) => res.sendFile(path.join(process.cwd(), "frontend/build", "index.html"))
);

if (helpersConfig.nodeEnv === "production") {
    app.listen(80);
} else {
    const open = require("open");
    const port = "3000";
    app.listen(port, () => {
        const url = `http://127.0.0.1:${port}`;
        console.log(`Listening on ${url}`);
        open(url);
    });
}
