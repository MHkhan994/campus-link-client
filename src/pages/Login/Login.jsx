import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit = data => {
        console.log(data);
    };

    const hanldeGoogleLogin = () => {
        googleLogin()
            .then(result => {
                if (result.user) {
                    navigate('/')
                }
            })
    }

    return (
        <div className="my-container mt-20">
            <h1 className="text-3xl font-semibold text-center pb-10 text-green-600">Login</h1>
            <div className="grid lg:grid-cols-2">
                <div>

                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input {...register("name")} type="email" placeholder="Your Email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", { required: true })} type="password" placeholder="Your Password" className="input input-bordered" />
                            {errors.password && <span className="text-red-600 pt-2">This field is required</span>}
                        </div>
                        <button className="bg-green-600 rounded-lg h-12 w-full mt-5">
                            Login
                        </button>
                    </form>
                    <div>
                        <p className="text-center text-lg text-green-600 py-3">or sign in with</p>
                        <button onClick={hanldeGoogleLogin} className="bg-blue-600 rounded-lg h-12 w-full mt-5">
                            <FaGoogle className="mx-auto text-2xl text-white inline-block"></FaGoogle>
                            <span className="text-white text-xl ps-4">Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;