const parseEnvFile = require("dotenv").config();

if (parseEnvFile.error) {
    throw parseEnvFile.error;
}

const helpersConfig = {
    asset: path => {
        if (path[0] === "/") return `${path}`;
        return `/${path}`;
    },
    appName: process.env.APP_NAME,
    nodeEnv: process.env.NODE_ENV,
    appDebug: process.env.APP_DEBUG,
    appURL: process.env.APP_URL,
    appLocale: process.env.APP_LOCALE,
    // fixer
    ramURL: process.env.RAM_URL,
};

module.exports = {
    helpersConfig
};