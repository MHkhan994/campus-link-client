import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

import loginImg from '../../assets/login.jpg'

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { googleLogin, login, facebookLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const [emailError, setemailError] = useState('')
    const [passError, setPassError] = useState('')

    const onSubmit = data => {
        setemailError('')
        const email = data.email
        const password = data.password
        login(email, password)
            .then(result => {
                if (result.user) {
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
                if (error.message.includes('user-not-found')) {
                    setemailError('invalid email address')
                }
                else if (error.message.includes('wrong-password')) {
                    setPassError('invalid password')
                }
            })
    };

    const hanldeGoogleLogin = () => {
        googleLogin()
            .then(result => {
                if (result.user) {
                    navigate('/')
                }
            })
    }


    const handleFacebookLogin = () => {
        facebookLogin()
            .then(result => {
                console.log(result);
            })
    }

    return (
        <div className="my-container mt-20">
            <h1 className="text-3xl font-semibold text-center pb-10 text-green-600">Login</h1>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                    <img src={loginImg} alt="" />
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="Your Email" className="input input-bordered" />
                            {emailError && <span className="text-red-600 pt-2">{emailError}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", { required: true })} type="password" placeholder="Your Password" className="input input-bordered" />
                            {errors.password && <span className="text-red-600 pt-2">This field is required</span>}
                            {passError && <span className="text-red-600 pt-2">{passError}</span>}
                        </div>
                        <button className="bg-green-600 rounded-lg h-12 w-full mt-5">
                            Login
                        </button>
                    </form>
                    <div>
                        <p className="text-center text-lg text-green-600 py-3">or sign in with</p>
                        <button onClick={hanldeGoogleLogin} className="bg-gray-200 border border-green-600 rounded-lg h-12 w-full mt-5">
                            <FaGoogle className="mx-auto mb-1 text-blue-500 text-2xl inline-block"></FaGoogle>
                            <span className="text-xl ps-4">Google</span>
                        </button>
                        <button onClick={handleFacebookLogin} className="bg-gray-200 border border-green-600 rounded-lg h-12 w-full mt-5">
                            <FaFacebook className="mx-auto text-blue-600 mb-1 text-2xl inline-block"></FaFacebook>
                            <span className=" text-xl ps-4">Facebook</span>
                        </button>
                        <p className="text-center py-2">Don't have an accout? <Link className="text-blue-600" to={'/register'}>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;