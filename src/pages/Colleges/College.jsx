import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi';

import { Navigation, Autoplay } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import 'swiper/css';
import 'swiper/css/pagination';

const College = () => {

    const { id } = useParams()

    const { data: college = {} } = useQuery({
        queryKey: ['oneCollege'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/college/${id}`)
            return res.data
        }
    })

    const { name, image, admissionDate, events, overview, reviews, admissionProcess, facilities, sports, contactInfo } = college

    console.log(reviews);

    return (
        <div className='my-container py-20'>
            <h1 className='text-3xl text-center py-4 text-green-700'>{name}</h1>
            <img className='mx-auto' src={image} alt="" />
            <div className='w-4/5 pt-5 mx-auto text-lg text-green-600'>
                <marquee direction="">{admissionDate}</marquee>
            </div>
            <div>
                <h1 className='text-center text-xl pb-4 font-semibold'>Upcomming Events:</h1>
                <div className='grid lg:grid-cols-3 justify-center gap-10'>
                    {
                        events?.map(e => <div className='bg-green-700 text-lg font-semibold text-white rounded-lg p-3 text-center shadow-lg' key={e.id}>
                            <p>{e.name}</p>
                            <p>{e.date}</p>
                            <p>{e.location}</p>
                        </div>)
                    }
                </div>
            </div>
            <div className='py-5 space-y-2'>
                <h1 className='text-gray-700 text-lg'><span className='text-xl font-semibold'>Overview: </span> {overview}</h1>
                <h1 className='text-gray-700 text-lg'><span className='text-xl font-semibold'>Facilities: </span> {facilities}</h1>
                <h1 className='text-gray-700 text-lg'><span className='text-xl font-semibold'>Admission Process: </span> {admissionProcess}</h1>
                <div>
                    <span className='text-xl font-semibold'>Sports Cetegory: </span>
                    {
                        sports?.map(s => <li key={s}>{s}</li>)
                    }
                </div>
            </div>
            <div>
                <h1 className='text-center text-2xl pb-4 font-semibold'>Reviews:</h1>
                <Swiper
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    slidesPerView={"auto"}
                    modules={[Navigation, Autoplay]}
                >
                    {
                        reviews?.map(r => <SwiperSlide className='text-center space-y-1 rounded-lg mx-auto bg-green-300 py-3' key={r.reviewDate}>
                            <h2 className='text-xl font-semibold'>{r.userName}</h2>
                            <Rating
                                style={{ maxWidth: 150 }}
                                readOnly
                                orientation="horizontal"
                                value={r.rating}
                                className='mx-auto'
                            />
                            <div className='flex justify-center text-lg gap-3'>
                                <BiSolidQuoteLeft></BiSolidQuoteLeft>
                                <p>{r.comment}</p>
                                <BiSolidQuoteRight></BiSolidQuoteRight>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className='py-4'>
                <h1 className='font-bold text-xl'>Contact Info:</h1>
                <p>{contactInfo?.address}</p>
                <p>{contactInfo?.email}</p>
                <p>{contactInfo?.phone}</p>
            </div>
        </div>
    );
};

export default College;