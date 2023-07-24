import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const { data: dbUser = [] } = useQuery({
        queryKey: ['dbdbUser', user],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/user?email=${user?.email}`)
            return res.data
        }
    })

    const onSubmit = data => {
        const name = data.name || dbUser.name;
        const email = data.email || dbUser.email;
        const phone = data.phone || dbUser.phone;
        const address = data.address || dbUser.address;
        const university = data.university || dbUser.university
        const image = dbUser.image

        axios.patch('http://localhost:5000/updateUser', { name, email, phone, address, university, image })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your profile has been updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/profile')
                }
            })
    }

    return (
        <div className="my-container pt-20">
            <h1 className="text-center text-xl font-semibold text-green-600">Update Profile</h1>
            <form className="lg:w-8/12 md:w-10/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Student Name</span>
                    </label>
                    <input {...register("name")} type="text" defaultValue={dbUser?.name} placeholder="Your Name" className="input h-10 input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input {...register("email")} defaultValue={dbUser?.email} type="email" placeholder="email" className="h-10 input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input {...register("phone")} defaultValue={dbUser?.phone} type="number" placeholder="phone" className="h-10 input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input {...register("address")} defaultValue={dbUser?.address} type="text" placeholder="address" className="h-10 input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">University</span>
                    </label>
                    <input {...register("university")} defaultValue={dbUser?.university} type="text" placeholder="university" className="h-10 input input-bordered" />
                </div>
                <div>
                    <button className="my-4 my-btn w-full">Apply Changes</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;