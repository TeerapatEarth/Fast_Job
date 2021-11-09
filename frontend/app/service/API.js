const BASE_URL = 'http://192.168.1.3:5001'
const API = {
    Auth: {
        login: `${BASE_URL}/login`,
        session: `${BASE_URL}/session`,
        logout: `${BASE_URL}/logout`
    },
    User: {
        regis: `${BASE_URL}/register`,
        update: `${BASE_URL}/updateuser/`,
        delete: `${BASE_URL}/deleteuser/`,
        oneUser: `${BASE_URL}/user/`,
        report: `${BASE_URL}/report/`
    },
    Post: {
        create: `${BASE_URL}/post/create`,
        getAllPost: `${BASE_URL}/post`
    }
}

export default API