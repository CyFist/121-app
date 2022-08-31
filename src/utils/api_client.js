import axios from "axios";

const axxios = axios.create({
  baseURL: "https://onetwoone-ca88.restdb.io/rest",
  headers: {
    "Content-Type": "application/json",
    "x-apikey": "63027f8439a0a971fe91626a",
    "cache-control": "no-cache",
  },

});

export default axxios