import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const UseColleges = () => {
    const { data: colleges = [] } = useQuery({
        queryKey: ['useColleges'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/colleges')
            return res.data
        }
    })

    return { colleges }
};

export default UseColleges;