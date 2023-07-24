
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const Gallery = () => {

    const { data: gallery = [] } = useQuery({
        queryKey: ['gallery'],
        queryFn: async () => {
            const res = await axios.get('https://campus-link-server.vercel.app/gallery')
            return res.data
        }
    })

    return (
        <div className='pb-10'>
            <h1 className="text-center text-3xl py-6 font-semibold">Gallery</h1>
            <div className="hidden lg:block">
                <Swiper
                    slidesPerView={2}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={20}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay, Navigation, FreeMode]}
                    className='h-[66vh] my-container pb-10'
                >
                    {
                        gallery.map(item => <SwiperSlide className='my-swiper-slide' key={item._id}>
                            <img className='h-full rounded-md object-cover w-full' src={item.imageUrl} alt="" />
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

            {/* phone */}
            <div className="block lg:hidden md:hidden">
                <Swiper
                    slidesPerView={1}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={0}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className='h-[43vh] w-[95vw] mx-auto'
                >
                    {
                        gallery.map(item => <SwiperSlide className='my-swiper-slide' key={item._id}>
                            <img className='object-cover h-[39vh] w-full rounded-md' src={item.imageUrl} alt="" />
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

            {/* tablet */}
            <div className="hidden lg:hidden md:block">
                <Swiper
                    slidesPerView={1}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay, Navigation]}
                    className='h-[43vh] my-container pb-10'
                >
                    {
                        gallery.map(item => <SwiperSlide className='my-swiper-slide' key={item._id}>
                            <img className='rounded-md w-full max-h-[40vh] object-cover' src={item.imageUrl} alt="" />
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Gallery;