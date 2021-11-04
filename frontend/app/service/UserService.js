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
    static async getOneUser(id){
        return await axios.get(API.User.oneUser+id)
    }
    static async reportUser(id){
        return await axios.put(API.User.report+id)
    }
}

export default UserService