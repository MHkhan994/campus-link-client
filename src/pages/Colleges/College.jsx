import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const College = () => {

    const { id } = useParams()

    const { data: college = {} } = useQuery({
        queryKey: ['oneCollege'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/college/${id}`)
            return res.data
        }
    })

    console.log(college);

    return (
        <div>

        </div>
    );
};

export default College;