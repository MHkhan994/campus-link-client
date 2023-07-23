import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Admission = () => {

    const navigate = useNavigate()

    const { data: colleges = [] } = useQuery({
        queryKey: ['colleges'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/colleges')
            return res.data
        }
    })


    return (
        <div className="my-container mt-20">
            <h1 className="text-center text-2xl py-5 font-semibold">Admission</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5">
                {
                    colleges.map(c => <div className="bg-green-50 p-5 border border-green-100 rounded-md shadow-lg" key={c._id}>
                        <img src={c.image} alt="" />
                        <h1 className="text-center font-semibold text-lg">{c.name}</h1>
                        <div className="flex justify-center gap-3 pt-2">
                            <button className="my-btn">
                                <Link to={`/college/${c._id}`}>Details</Link>
                            </button>
                            <button onClick={() => navigate(`/admissionInfo/${c._id}`)} className="my-btn">Apply</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Admission;