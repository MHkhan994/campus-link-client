import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";

const Review = () => {

    const { data: reviews = [] } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axios.get('https://campus-link-server.vercel.app/reviews')
            return res.data
        }
    })

    return (
        <div className="pt-10">
            <h1 className="text-center text-3xl py-6 font-semibold">Reviews</h1>
            <div>
                <Swiper
                    slidesPerView={'auto'}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay, Navigation, FreeMode]}
                    className='my-container'
                >
                    {
                        reviews.map(item => <SwiperSlide className='mb-10 space-y-2 p-4 min-h-[8rem] bg-green-100 rounded-md shadow-lg' key={item._id}>
                            <h2 className='text-xl text-center font-semibold'>{item.userName}</h2>
                            <Rating
                                style={{ maxWidth: 150 }}
                                readOnly
                                orientation="horizontal"
                                value={item.rating}
                                className='mx-auto'
                            />
                            <p className="text-lg text-center text-green-600 font-semibold">{item.college}</p>
                            <p className="text-center">{item.reviewDate}</p>
                            <div className='flex justify-center text-lg gap-3'>
                                <BiSolidQuoteLeft></BiSolidQuoteLeft>
                                <p className="text-center">{item.comment}</p>
                                <BiSolidQuoteRight></BiSolidQuoteRight>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>


            {/* mobile */}
        </div>
    );
};

export default Review;