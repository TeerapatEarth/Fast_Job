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
    static async searchPost(word){
        return await axios.get(API.Post.searchPost+word)
    }
}

export default PostService;