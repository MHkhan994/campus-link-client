import CollegeCard from './CollegeCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';

const Colleges = () => {

    const { data: colleges = [], isLoading } = useQuery({
        queryKey: ['colleges'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/colleges')
            return res.data
        }
    })

    return (
        <div className='my-container pt-20'>
            {
                isLoading ? <LoadingSpinner></LoadingSpinner>
                    :
                    <div className='grid lg:grid-cols-3 gap-4 justify-between'>
                        {
                            colleges.map(college => <CollegeCard key={college._id} college={college}></CollegeCard>)
                        }
                    </div>
            }
        </div>
    );
};

export default Colleges;