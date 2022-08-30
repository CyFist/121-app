import axios from 'axios';

// CORS enabled apikey
const apikey = '5x5fx501xfcex9e87x11ex6x';

// Autotrade delay
const trade_delay = 10000; // millis

// REST endpoint
let restdb = axios.create({
    baseURL: 'https://reactrealtime-6683.restdb.io',
    timeout: 1000,
    headers: { 'x-apikey': apikey }
});
// Eventsource endpoint
const realtimeURL = `https://reactrealtime-6683.restdb.io/realtime?apikey=${apikey}`

export { apikey, restdb, realtimeURL, trade_delay };