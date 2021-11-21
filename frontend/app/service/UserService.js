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
    static async seeNotify(id){
        return await axios.put(API.User.seeNotify+id)
    }
    static async getAllUser(){
        return await axios.get(API.User.getAllUser)
    }
    static async banUser(id){
        return await axios.put(API.User.ban+id)
    }
    static async unBan(id){
        return await axios.put(API.User.unBan+id)
    }
    static async deleteNotiPost(payload, id){
        return await axios.put(API.User.deletePostNoti+id, payload)
    }
    static async deleteNotiJob(payload, id){
        return await axios.put(API.User.deleteJobNoti+id, payload)
    }
}

export default UserService