const BASE_URL = 'http://192.168.1.7:5001'
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
        report: `${BASE_URL}/report/`,
        seeNotify: `${BASE_URL}/seenotifypost/`,
        getAllUser: `${BASE_URL}/user`,
        ban: `${BASE_URL}/ban/`,
        unBan: `${BASE_URL}/unban/`
    },
    Post: {
        create: `${BASE_URL}/post/create`,
        getAllPost: `${BASE_URL}/post`,
        editPost: `${BASE_URL}/post/update/`,
        deletePost: `${BASE_URL}/post/delete/`,
        searchPost: `${BASE_URL}/post/search/`
    },
    Job: {
        getJob: `${BASE_URL}/job`,
        create: `${BASE_URL}/job/create`,
        delete: `${BASE_URL}/job/delete/`
    }
}

export default API