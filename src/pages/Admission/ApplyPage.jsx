import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const ApplyPage = () => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const { data: college = {} } = useQuery({
        queryKey: ['oneCollege'],
        queryFn: async () => {
            const res = await axios.get(`https://campus-link-server.vercel.app/college/${id}`)
            return res.data
        }
    })

    const { name, _id, subjects } = college

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.patch('https://campus-link-server.vercel.app/appliedOrNot', { _id, user: user.email })
            .then(res => {
                console.log(res.data);
                if (res.data.applied === true) {
                    Swal.fire({
                        icon: 'error',
                        text: `already applied to ${name}`,
                    })
                    return
                }
            })
        const studentName = data.name;
        const email = data.email
        const phone = data.phone
        const address = data.address
        const birthday = data.birthday;
        const subject = data.subject
        const photo = data.photo
        const date = new Date()

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
                    axios.post('https://campus-link-server.vercel.app/application', { collegeId: _id, studentName, college: name, email, phone, address, birthday, subject, date, image })
                        .then(result => {
                            if (result.data.insertedId) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Application Complete',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                navigate('/myCollege')
                            }
                        })
                }
            })


    }

    return (
        <div className='pt-20 my-container'>
            <h1 className="text-2xl font-semibold text-green-600 text-center pb-6">Apply to: {name}</h1>
            <div className="w-[60%] mx-auto">
                <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Student Name</span>
                        </label>
                        <input {...register("name", { required: true })} type="text" defaultValue={user?.displayName} placeholder="Your Name" className="input h-10 input-bordered" />
                        {errors.name && <span className="text-red-600 pt-2">please enter your name</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register("email", { required: true })} type="email" defaultValue={user?.email} placeholder="Your email" className="input h-10 input-bordered" />
                        {errors.email && <span className="text-red-600 pt-2">please enter your email</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input {...register("phone", { required: true })} type="number" placeholder="Your phone number" className="input h-10 input-bordered" />
                        {errors.phone && <span className="text-red-600 pt-2">please enter your phone number</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input {...register("address", { required: true })} type="text" placeholder="Your address" className="input h-10 input-bordered" />
                        {errors.address && <span className="text-red-600 pt-2">please enter your address</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of Birth</span>
                        </label>
                        <input {...register("birthday", { required: true })} type="date" placeholder="Your date of birth" className="input h-10 input-bordered" />
                        {errors.birthday && <span className="text-red-600 pt-2">please enter your date of birth</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Subject</span>
                        </label>
                        <select {...register("subject", { required: true })} placeholder="select subject" className="input h-10 input-bordered">
                            {
                                subjects?.map(s => <option key={s} value={`${s}`}>{s}</option>)
                            }
                        </select>
                        {errors.subject && <span className="text-red-600 pt-2">please select a subject</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input {...register("photo", { required: true })} type="file" placeholder="Your photo" className="input h-10" />
                        {errors.photo && <span className="text-red-600 pt-2">please add your formal photo</span>}
                    </div>
                    <div className="flex justify-center py-3">
                        <button className="my-btn w-full">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyPage;