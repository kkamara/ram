const { helpersConfig } = require("./config");

const minifyHTML = require("express-minify-html");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");
const express = require("express");
const csurf = require("csurf");
const xss = require("xss");
const app = express();

const parseForm = bodyParser.urlencoded({ extended: false });
const csrfProtection = csurf({ cookie: true });

app.set("view engine", "pug");

const middleware = {
    csrfProtection,
    parseForm,
    handleCsrfError: (err, req, res, next) => {
        if (err.code !== "EBADCSRFTOKEN") return next(err);

        res.status(403);
        res.send("Unsuccessful");
    },
    render: function(view, params) {
        return function(req, res, next) {
            helpersConfig.csrfToken = req.csrfToken();
            res.render(view, Object.assign(params, helpersConfig));
            next();
        };
    }
};

app.use(
    minifyHTML({
        override: true,
        exception_url: false,
        htmlMinifier: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true
        }
    })
);
app.use(express.static("public"));
app.use(cookieParser());

app.get(
    "/", 
    middleware.csrfProtection, 
    middleware.render("pages/index", { title: "Homepage" })
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
