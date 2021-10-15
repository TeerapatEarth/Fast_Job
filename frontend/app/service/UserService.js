import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class UserService {
    static async regis(payload){
        console.log('pass')
        return await axios.post(API.User.regis, payload)
    }
}

export default UserService