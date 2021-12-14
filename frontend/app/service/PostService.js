import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class PostService {
    static async create(payload){
        return await axios.post(API.Post.create, payload)
    }
    static async getAllPost(){
        return await axios.get(API.Post.getAllPost)
    }
    static async getOnePost(id){
        return await axios.get(API.Post.getOnePost+id)
    }
    static async editPost(id, payload){
        return await axios.put(API.Post.editPost+id, payload)
    }
    static async deletePost(id){
        return await axios.delete(API.Post.deletePost+id)
    }
    static async searchPost(word){
        return await axios.get(API.Post.searchPost+word)
    }
    static async addUser(payload, id){
        return await axios.put(API.Post.addUser+id, payload)
    }
    static async cancleUser(payload, id){
        return await axios.put(API.Post.cancleUser+id, payload)
    }
    static async applyUser(payload, id){
        return await axios.put(API.Post.applyUser+id, payload)
    }
}

export default PostService;
