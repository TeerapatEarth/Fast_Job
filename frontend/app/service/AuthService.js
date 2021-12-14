import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class AuthService {
    static async login(payload) {
        return await axios.post(API.Auth.login, payload)
    }
    static async logout() {
        return await axios.post(API.Auth.logout)
    }
    static async session() {
        return await axios.get(API.Auth.session)
    }
    static async regis(payload){
        return await axios.post(API.User.regis, payload)
    }
}

export default AuthService