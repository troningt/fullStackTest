import nconf from "nconf";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Config {
    constructor() {
        // load config file
        nconf.argv()
            .env()
            .file({
                file: __dirname + "\\config.json",
            });
    }
    get(key) {
        return nconf.get(key);
    }
}


export default new Config()