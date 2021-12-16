import axios from "axios";

export const get = (url) => axios.get(url);

export const post = (url, payload) => axios.post(url, payload);

export const update = (url, payload) => axios.put(url, payload);
