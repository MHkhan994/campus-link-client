import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

import loginImg from '../../assets/login.jpg'
import axios from "axios";
import Swal from "sweetalert2";
import { sendEmailVerification } from "firebase/auth";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { googleLogin, login, githubLogin, logOut, passwordReset } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || '/'

    const [emailError, setemailError] = useState('')
    const [passError, setPassError] = useState('')

    const onSubmit = data => {
        setemailError('')
        const email = data.email
        const password = data.password
        login(email, password)
            .then(result => {
                if (result.user.emailVerified) {
                    navigate(from)
                }
                else {
                    setemailError('email not verified. please verify your email. A verification email has been sent to you.')
                    sendEmailVerification(result.user)
                    logOut()
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
                    const user = result.user
                    axios.post('https://campus-link-server.vercel.app/user', { name: user.displayName, image: user.photoURL, email: user.email, phone: '', address: '', university: '' })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.insertedId || res.data.alreadyUser === true) {
                                navigate(from)
                            }
                        })
                }
            })
    }


    const handleGithubLogin = () => {
        githubLogin()
            .then(result => {
                if (result.user) {
                    const user = result.user
                    axios.post('https://campus-link-server.vercel.app/user', { name: user.displayName, image: user.photoURL, email: user.email, phone: '', address: '', university: '' })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.insertedId || res.data.alreadyUser === true) {
                                navigate(from)
                            }
                        })
                }
            })
            .catch(error => {
                if (error.message.includes('account-exists-with-different-credential')) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'a account with same email address exists. try logging in with that email account',
                    })
                }
            })
    }

    const handleModalClose = () => {
        const dialog = document.querySelector('dialog')
        dialog.close()
    }

    const handleResetPass = (e) => {
        const dialog = document.querySelector('dialog')
        e.preventDefault()
        const email = e.target.resetEmail.value;
        passwordReset(email)
            .then(() => {
                e.target.reset()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'please check your email to reset password',
                    showConfirmButton: false,
                    timer: 3000
                })
                dialog.close()
            })
    }

    return (
        <div className="my-container mt-20">
            <h1 className="text-3xl font-semibold text-center pb-10 text-green-600">Login</h1>
            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-10 items-center">
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

                    {/* password reset */}
                    <p>forgot password? <button className="text-blue-500" onClick={() => window.my_modal_1.showModal()}>reset</button></p>
                    <dialog id="my_modal_1" className="modal">
                        <div method="dialog" className="modal-box">
                            <form onSubmit={handleResetPass}>
                                <h1 className="text-center text-lg">Get password reset code</h1>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Enter Email</span>
                                    </label>
                                    <input name="resetEmail" type="email" placeholder="Your Email" className="input input-bordered" />
                                </div>
                                <button className="my-btn block mx-auto my-3">
                                    send code
                                </button>
                            </form>
                            <div className="modal-action">
                                {/* if there is a button in form, it will close the modal */}
                                <button onClick={handleModalClose} className="btn">Close</button>
                            </div>
                        </div>
                    </dialog>


                    <div>
                        <p className="text-center text-lg text-green-600 py-3">or sign in with</p>
                        <button onClick={hanldeGoogleLogin} className="bg-gray-200 border border-green-600 rounded-lg h-12 w-full mt-5">
                            <FaGoogle className="mx-auto mb-1 text-blue-500 text-2xl inline-block"></FaGoogle>
                            <span className="text-xl ps-4">Google</span>
                        </button>
                        <button onClick={handleGithubLogin} className="bg-gray-200 border border-green-600 rounded-lg h-12 w-full mt-5">
                            <FaGithub className="mx-auto text-gray-600 mb-1 text-2xl inline-block"></FaGithub>
                            <span className=" text-xl ps-4">Github</span>
                        </button>
                        <p className="text-center py-2">Don't have an accout? <Link className="text-blue-600" to={'/register'}>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;