import dotenv from "dotenv";
import path from 'path';

if (process.env.NODE_ENV !== "production") {
    const parseEnvFile = dotenv.config({
        path: path.join(__dirname, '../', '.env'),
    });

    if (parseEnvFile.error) {
        throw parseEnvFile.error;
    }
}

const helpersConfig = {
    asset: path => {
        if (path[0] === "/") return `${path}`;
        return `/${path}`;
    },
    appName: process.env.APP_NAME,
    nodeEnv: process.env.NODE_ENV,
    appDebug: process.env.APP_DEBUG == 'true',
    appURL: process.env.APP_URL,
    appLocale: process.env.APP_LOCALE,
    appPort: process.env.PORT || process.env.port || 3000,
    ramAPI: process.env.RAM_API,
};

export default helpersConfig;
