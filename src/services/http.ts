import axios from "axios"

export const baseURL = "https://api-cola.imbtech.uz/api/v1"

const http = axios.create({ baseURL })

export default http