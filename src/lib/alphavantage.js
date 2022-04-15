import axios from 'axios';
// methods to make getting data easier(in the long run)
// 
// TODO: Implement indexedDB for caching data instead of requesting every time
// import 
import fs, { readFile } from 'fs';
import env from 'dot-env'
env.config()

// API key stored in .env file, never hardcode sensitive data
// also make sure file is in .gitignore to prevent committing to repo
const API_KEY = !process.env.API_KEY? null : process.env.API_KEY;
const BASE_URL= 'https://www.alphavantage.co/query?';

// TODO: automate listing of currencies and other values from provided csv's from alphavantage
// read file
const getCSV = function (URL) {
    fs.readFile(filename, 'utf-8', (err,data) => {
        if(!err) {
            return readCSV(data)
        } else {
            throw `Unable to read csv file ${filename}`
        }
    });
};

// parse text file / csv and stores them in an array
const readCSV = function (f) {
    return f
};

// following should be generated onthe fly as much as possible
const markets = {

}
const symbols = {

}
const avFuncs = {
    CRYPTO: {
        intraday: 'CRYPTO_INTRADAY',
        daily: 'DIGITAL_CURRENCY_DAILY',
        weekly: 'DIGITAL_CURRENCY_WEEKLY',
        monthly: 'DIGITAL_CURRENCY_MONTHLY'
    }
};

export { avFuncs, API_KEY };
export default {
    api_key: API_KEY,
    functions: avFuncs,
    markets: markets,
    symbols: symbols,
}