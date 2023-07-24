import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Profile = () => {
    const { user, loading } = useContext(AuthContext)

    const { data: dbUser = [], isLoading } = useQuery({
        queryKey: ['dbdbUser', user],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/user?email=${user?.email}`)
            return res.data
        }
    })

    console.log(dbUser);

    return (
        <div className="pt-20 my-container">
            <h1 className="text-center text-3xl py-5 font-semibold">Profile</h1>
            {
                loading || isLoading ? <LoadingSpinner></LoadingSpinner>
                    :
                    <div className="">
                        <button className="my-btn block ms-auto">
                            <Link to={'/updateProfile'}>Update</Link>
                        </button>
                        <div className="flex flex-col items-center gap-3">
                            <img className="rounded-full h-48" src={dbUser?.image} alt="" />
                            <h1 className="text-2xl font-semibold">{dbUser?.name}</h1>
                            <div className="space-y-2 text-xl">
                                <p>Email: {dbUser?.email}</p>
                                <p>Phone: {dbUser?.phone}</p>
                                <p>Address: {dbUser?.address}</p>
                                <p>University: {dbUser?.university}</p>
                            </div>
                        </div>
                        <dialog id="my_modal_4" className="modal">

                        </dialog>
                    </div>
            }
        </div>
    );
};

export default Profile;