import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";

const Admission = () => {

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const { data: colleges = [], isLoading } = useQuery({
        queryKey: ['colleges', user],
        queryFn: async () => {
            const res = await axios.get('https://campus-link-server.vercel.app/colleges')
            return res.data
        }
    })

    const handleApply = (id, name) => {
        axios.patch('https://campus-link-server.vercel.app/appliedOrNot', { id, user: user?.email })
            .then(res => {
                console.log(res.data);
                if (res.data.applied === true) {
                    Swal.fire({
                        icon: 'error',
                        text: `already applied to ${name}`,
                    })
                }
                else {
                    navigate(`/apply/${id}`)
                }
            })
    }


    return (
        <div className="my-container mt-20">
            <h1 className="text-center text-2xl py-5 font-semibold">Admission</h1>
            {
                isLoading ? <LoadingSpinner></LoadingSpinner> :

                    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
                        {
                            colleges.map(c => <div className="bg-green-50 p-5 border border-green-100 rounded-md shadow-lg" key={c._id}>
                                <img src={c.image} alt="" />
                                <h1 className="text-center font-semibold text-lg">{c.name}</h1>
                                <div className="flex justify-center gap-3 pt-2">
                                    <button className="my-btn">
                                        <Link to={`/college/${c._id}`}>Details</Link>
                                    </button>
                                    <button onClick={() => handleApply(c._id, c.name)} className="my-btn">Apply</button>
                                </div>
                            </div>)
                        }
                    </div>
            }
        </div>
    );
};

export default Admission;