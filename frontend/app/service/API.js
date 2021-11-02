const BASE_URL = 'http://192.168.1.7:5001'
const API = {
    Auth: {
        login: `${BASE_URL}/login`,
        session: `${BASE_URL}/session`,
        logout: `${BASE_URL}/logout`
    },
    User: {
        regis: `${BASE_URL}/register`,
        update: `${BASE_URL}/updateuser/`
    }
}

export default API