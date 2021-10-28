import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class UserService {
    static async regis(payload){
        return await axios.post(API.User.regis, payload)
    }
}

export default UserService