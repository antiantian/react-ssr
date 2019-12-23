import axios from 'axios'
import http from 'http'
const  config={
     baseURL: '/',
     
}
const Axios = axios.create({ config });
const  serverAxios = axios.create({   baseURL: 'http://localhost:9090/', });
export   {Axios,serverAxios}
