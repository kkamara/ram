const { helpersConfig } = require("./config");

const cookieParser = require("cookie-parser");
const sanitize = require('sanitize');
const express = require("express");
const app = express();

const ramAPI = require('./models/ramAPI');

const path = require('path');

/** serving react with static path */
const buildPath = path.join(
    __dirname,
    '../',
    'frontend',
    'build'
);
app.use(express.static(buildPath));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sanitize.middleware);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", helpersConfig.appURL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
if (helpersConfig.appDebug === true) {
    /** Better stack traces for server errors */
    app.use((req, res, next) => {
        const render = res.render;
        const send = res.send;
        res.render = function renderWrapper(...args) {
            Error.captureStackTrace(this);
            return render.apply(this, args);
        };
        res.send = function sendWrapper(...args) {
            try {
                send.apply(this, args);
            } catch (err) {
                console.error(`Error in res.send | ${err.code} | ${err.message} | ${res.stack}`);
            }
        };
        next();
    });
}

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

// Serving react
app.get('/status', function(req, res) {
    res.sendFile(path.join(buildPath, 'index.html'), err => {
      if (err) {
        res.status(500).send(err)
      }
    });
});
app.get('/characters/:id', function(req, res) {
    res.sendFile(path.join(buildPath, 'index.html'), err => {
      if (err) {
        res.status(500).send(err)
      }
    });
});
app.get('/search', function(req, res) {
    res.sendFile(path.join(buildPath, 'index.html'), err => {
      if (err) {
        res.status(500).send(err)
      }
    });
});
app.get('/404', function(req, res) {
    res.sendFile(path.join(buildPath, 'index.html'), err => {
      if (err) {
        res.status(500).send(err)
      }
    });
});

if (helpersConfig.nodeEnv === "production") {
    app.listen(helpersConfig.appPort);
} else {
    app.listen(helpersConfig.appPort, () => {
        const url = `http://127.0.0.1:${helpersConfig.appPort}`;
        console.log(`Listening on ${url}`);
    });
}
