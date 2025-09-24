import axios from "axios"

export const baseURL = "http://192.168.1.178:8001/api/v1"

const http = axios.create({ baseURL })

export default http