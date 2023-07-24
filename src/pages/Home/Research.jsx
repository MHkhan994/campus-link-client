import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Research = () => {

    const [sliceNum, setSliceNum] = useState(3)

    const { data: research = [] } = useQuery({
        queryKey: ['research', sliceNum],
        queryFn: async () => {
            const res = await axios.get(`https://campus-link-server.vercel.app/research?slice=${sliceNum}`)
            return res.data
        }
    })

    console.log(research);

    return (
        <div className="my-container">
            <h1 className="text-center text-3xl py-6 font-semibold">Research Papers</h1>
            <div>
                <div className="grid lg:grid-cols-3 gap-5 md:grid-cols-2">
                    {
                        research.map(item => <div key={item._id} className="bg-gray-100 shadow-lg rounded-md p-3">
                            <h1 className="font-semibold text-lg text-green-600">Title:{item.title}</h1>
                            <p>College: {item.college}</p>
                            <p className="pb-3">Students: {item.researchers.map(i => <span key={i}>{i},</span>)}</p>
                            <p className="text-gray-500">{item.description}
                                <a target="_blank" rel="noreferrer" className="text-blue-600" href={item.link}>more</a>
                            </p>
                        </div>)
                    }
                </div>
                {
                    sliceNum !== 0 && <div className="flex justify-center py-4">
                        <button onClick={() => setSliceNum(0)} className="my-btn">
                            See more
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Research;