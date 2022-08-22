import axios from 'axios';

// CORS enabled apikey
const apikey = '15e9368db2b95af3c2f8bbf14084e693cd200';

// Autotrade delay
const trade_delay = 10000; // millis

// REST endpoint
let restdb = axios.create({
    baseURL: 'https://onetwoone-ca88.restdb.io/',
    timeout: 1000,
    headers: { 'x-apikey': apikey }
});
// Eventsource endpoint
const realtimeURL = `https://onetwoone-ca88.restdb.io/realtime?apikey=${apikey}`

export { apikey, restdb, realtimeURL, trade_delay };