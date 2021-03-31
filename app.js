const { helpersConfig } = require("./config");

const cookieParser = require("cookie-parser");
const sanitize = require('sanitize');
const express = require("express");
const csurf = require("csurf");
const app = express();

const ramAPI = require('./models/ramAPI');

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

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sanitize.middleware);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-Type", "application/json");
    next();
});

router = express.Router();

// /characters
router.get('/characters', async (req, res) => {
    const page = req.query.page !== undefined ? req.query.page : 1;
    await ramAPI.getChars(page)
        .then(payload => {
            res.statusCode = 200;
            res.send(JSON.stringify({ data: payload.data }))
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify(false))
        });
});
// res.status(201).json
// /characters/search
router.get('/characters/search', async (req, res) => {
    const filterOptions = ['name', 'status', 'species', 'type', 'gender'];
    const filters = {};
    for (const filterOption of filterOptions) {
        if (undefined !== req.query[filterOption]) {
            filters[filterOption] = req.query[filterOption];
        }
    }
    const strFilters = ramAPI.uriEncodeArray(filters);
    const page = req.query.page !== undefined ? req.query.page : 1;
    await ramAPI.search(strFilters, page)
        .then(payload => {
            res.statusCode = 200;
            res.send(JSON.stringify({ data: payload.data }))
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify(false))
        });
});

// /characters/{id}
router.get('/characters/:id(\\d+)', async (req, res) => {
    if (null === `${req.params.id}`.match(/^\d+$/)) {
        res.statusCode = 400;
        return res.send({
            "Message": "ID parameter must be a valid integer."
        });
    }
    await ramAPI.getCharacter(req.params.id)
        .then(payload => {
            res.statusCode = 200;
            res.send(JSON.stringify({ data: payload.data }))
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify(false))
        });
});

app.use('/api/v1', router);

if (helpersConfig.nodeEnv === "production") {
    app.listen(80);
} else {
    const port = "3000";
    app.listen(port, () => {
        const url = `http://127.0.0.1:${port}`;
        console.log(`Listening on ${url}`);
    });
}
