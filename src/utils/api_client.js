import axios from "axios";

// CORS enabled apikey
const apikey = '63027f8439a0a971fe91626a';

const restdb = axios.create({
  baseURL: "https://onetwoone-ca88.restdb.io/rest",
  headers: {
    "Content-Type": "application/json",
    "x-apikey": apikey,
    "cache-control": "no-cache"
  },

});
// Eventsource endpoint
const realtimeURL = `https://onetwoone-ca88.restdb.io/realtime?apikey=${apikey}`

export { restdb, realtimeURL }