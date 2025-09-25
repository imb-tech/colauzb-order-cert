import axios from "axios"

export const baseURL = "https://api-cola.imbtech.uz/api/v1"

const http = axios.create({ baseURL })

http.interceptors.request.use(
    config => {
        const lang = localStorage.getItem('i18nextLng')

        config.headers['Accept-Language'] = lang ?? "uz"

        return config
    },
)

export default http