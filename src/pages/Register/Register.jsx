import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";

import registerImg from '../../assets/register.jpg'
import { updateProfile } from "firebase/auth";
import axios from "axios";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { googleLogin, createUser, facebookLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit = data => {
        const photo = data.photo
        const email = data.email
        const name = data.name
        const password = data.password
        console.log(email, password);

        const formData = new FormData()
        formData.append('image', photo[0])

        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_photoApi}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success == true) {
                    const image = data.data.display_url
                    createUser(email, password)
                        .then(result => {
                            updateProfile(result.user, { displayName: name, photoURL: image })
                            axios.post('http://localhost:5000/user', { name, image, email, phone: '', address: '', university: '' })
                                .then(ress => {
                                    if (ress.data.insertedId) {
                                        navigate('/')
                                    }
                                })
                        })
                }
            })
    };


    const hanldeGoogleLogin = () => {
        googleLogin()
            .then(result => {
                if (result.user) {
                    const user = result.user
                    axios.post('http://localhost:5000/user', { name: user.displayName, image: user.photoURL, email: user.email, phone: '', address: '', university: '' })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.insertedId || res.data.alreadyUser === true) {
                                navigate('/')
                            }
                        })
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
            <h1 className="text-3xl font-semibold text-center pb-10 text-green-600">Register</h1>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                    <img src={registerImg} alt="" />
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600 pt-2">please enter your name</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="Your Email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600 pt-2">please enter your email</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", { required: true })} type="password" placeholder="Your Password" className="input input-bordered" />
                            {errors.password && <span className="text-red-600 pt-2">please enter a password</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input {...register("photo", { required: true })} type="file" placeholder="Your photo" className="input" />
                            {errors.photo && <span className="text-red-600 pt-2">please add a photo</span>}
                        </div>
                        <button className="bg-green-600 rounded-lg h-12 w-full mt-5">
                            Register
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
                        <p className="text-center py-2">Already have an accout? <Link className="text-blue-600" to={'/login'}>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;