import axios from "axios"

const url = 'http://localhost:3000';
const API = axios.create({ baseURL: url})


export default API