import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
const Login = () => {
    const {SignIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const handleLogin = e => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        // console.log(email,password)
        SignIn(email,password)
        .then(result =>{
            const loggedInUser =result.user;
            console.log(loggedInUser)
            const user = {email}
            
            // get access token 
            axios.post('http://localhost:5000/jwt', user, {withCredentials:true})
            .then(res => {
                console.log(res.data)
                if(res.data.success){
                    navigate(location?.state?location?.state : '/')
                }
            })

        })
        .catch(error => console.error(error))
    }
    return (
        <div className="hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row">
                <div className=" w-1/2">
                   <img src={loginImg} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                
                    <form onSubmit={handleLogin} className="card-body">
                    <h1 className="text-3xl font-bold text-center">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" name='email' required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" name='password' required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-orange-500 text-white font-bold hover:text-black">Login</button>
                        </div>
                    </form>
                    <p className='font-semibold my-4 text-center'>New here ? <Link className='text-orange-500 font-bold' to='/signup'>SignUp</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;