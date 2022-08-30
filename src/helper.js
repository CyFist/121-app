import axios from 'axios';

// CORS enabled apikey
const apikey = '63027f8439a0a971fe91626a';

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