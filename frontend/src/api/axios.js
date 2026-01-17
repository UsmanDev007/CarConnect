import axios from 'axios'
const token=localStorage.getItem('token')
const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers:{
        'Authorization':`Bareer ${token}`
    }
})
export default API