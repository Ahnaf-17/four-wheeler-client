import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://four-wheeler-server.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
const {LogOut} = useAuth()
const navigate = useNavigate()
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error =>{
            console.log("error in interceptor:",error.response)
            if(error.response.status === 401 ||  error.response.status === 403){
                console.log('logout the user')
                LogOut()
                .then(()=>{
                    navigate('/login')
                })
                .catch(error=> console.log(error))
            }
        })
    },[])

    return axiosSecure
};

export default useAxiosSecure;