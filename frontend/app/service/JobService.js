import axios from 'axios';
import API from './API'
axios.defaults.withCredentials = true

class JobSerivce {
    static async createJob(payload){
        return await axios.post(API.Job.create, payload)
    }
    static async getJob(){
        return await axios.get(API.Job.getJob)
    }
    static async deleteJob(id){
        return await axios.delete(API.Job.delete+id)
    }
}
export default JobSerivce