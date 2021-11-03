import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class UserService {
    static async regis(payload){
        return await axios.post(API.User.regis, payload)
    }
    static async updateUser(id, payload){
        return await axios.put(API.User.update+id, payload)
    }
    static async deleteUser(id){
        return await axios.delete(API.User.delete+id)
    }
}

export default UserService