import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyCollege = () => {

    const { user } = useContext(AuthContext)

    const { data: appliedColleges = [], isLoading } = useQuery({
        queryKey: ['applicedColleges', user],
        queryFn: async () => {
            const res = await axios(`https://campus-link-server.vercel.app/applications?email=${user?.email}`)
            return res.data
        }
    })

    console.log(appliedColleges);

    return (
        <div className="my-container pt-20 min-h-[60vh]">
            <h1 className="text-center text-2xl py-6 font-semibold">My College</h1>
            {
                isLoading ? <LoadingSpinner></LoadingSpinner>
                    :

                    <div>
                        <div className="overflow-x-auto shadow-lg rounded-xl">
                            <table className="table bg-gray-50 text-lg">
                                {/* head */}
                                <thead>
                                    <tr className="text-lg bg-green-100">
                                        <th>#</th>
                                        <th>College</th>
                                        <th>Subject</th>
                                        <th>Apply Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appliedColleges.map((c, i) => {
                                            const { college, subject, _id, date } = c
                                            let strDate = new Date(date);

                                            let formattedDate = ('0' + (strDate.getUTCMonth() + 1)).slice(-2) + '-'
                                                + ('0' + strDate.getUTCDate()).slice(-2) + '-'
                                                + strDate.getUTCFullYear();

                                            console.log(i);
                                            return <tr key={_id}>
                                                <td>
                                                    {i + 1}
                                                </td>
                                                <td>
                                                    <h2>{college}</h2>
                                                </td>
                                                <td>
                                                    <h2>{subject}</h2>
                                                </td>
                                                <td>
                                                    <h2>{formattedDate}</h2>
                                                </td>
                                            </tr>

                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>

    );
};

export default MyCollege;