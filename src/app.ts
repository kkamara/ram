import helpersConfig from "./config"

import cookieParser from "cookie-parser"
import sanitize from 'sanitize'
import express from "express"
const app = express()

import ramAPI from './models/ramAPI'

import path from 'path'

/** serving react with static path */
const buildPath = path.join(
    __dirname,
    '../',
    'frontend',
    'build'
)
app.use(express.static(buildPath))

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(sanitize.middleware)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", helpersConfig.appURL)
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, x-id, Content-Length, X-Requested-With")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next()
})

const router = express.Router()

// /characters
router.get('/characters', async (req, res) => {
    const page = req.query.page !== undefined ? req.query.page : 1
    await ramAPI.getChars(page)
        .then(payload => {
            res.statusCode = 200
            res.send(JSON.stringify({ data: payload.data }))
        })
        .catch(err => {
            console.log(err)
            res.send(JSON.stringify(false))
        })
})

// /characters/search
router.get('/characters/search', async (req, res) => {
    const filterOptions = ['name', 'status', 'species', 'type', 'gender']
    const filters = {}
    for (const filterOption of filterOptions) {
        if (undefined !== req.query[filterOption]) {
            filters[filterOption] = req.query[filterOption]
        }
    }
    const strFilters = ramAPI.uriEncodeArray(filters)
    const page = req.query.page !== undefined ? req.query.page : 1
    await ramAPI.search(strFilters, page)
        .then((payload: { data: { [key: string]: any } }) => {
            res.statusCode = 200
            res.send(JSON.stringify({ data: payload.data }))
        })
        .catch(err => {
            console.log(err)
            res.send(JSON.stringify(false))
        })
})

// /characters/{id}
router.get('/characters/:id(\\d+)', async (req, res) => {
    if (null === `${req.params.id}`.match(/^\d+$/)) {
        res.statusCode = 400
        return res.send({
            "Message": "ID parameter must be a valid integer."
        })
    }
    await ramAPI.getCharacter(req.params.id)
        .then(payload => {
            res.statusCode = 200
            res.send(JSON.stringify({ data: payload.data }))
        })
        .catch(err => {
            console.log(err)
            res.send(JSON.stringify(false))
        })
})

app.use('/api/v1', router)

/** Serving react with static path */
const reactRoutesPath = path.join(
    buildPath,
    'index.html'
)
app.use('*', express.static(reactRoutesPath))

if (helpersConfig.nodeEnv === "production") {
    app.listen(helpersConfig.appPort)
} else {
    app.listen(helpersConfig.appPort, () => {
        const url = `http://127.0.0.1:${helpersConfig.appPort}`
        console.log(`Listening on ${url}`)
    })
}
