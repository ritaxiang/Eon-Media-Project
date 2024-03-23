import axios from "axios"

const url = 'http://localhost:5050';
const API = axios.create({ baseURL: url})


export default API