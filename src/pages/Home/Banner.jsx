import banner from '../../assets/banner.jpg'

const Banner = () => {
    return (
        <div className='relative'>
            <img className='lg:h-[80vh] h-[50vh] w-full object-cover' src={banner} alt="" />
            <div className='absolute w-full lg:h-[80vh] h-[50vh] bg-[#00000049] z-20 top-0 left-0'>
                <div className='my-container flex justify-center h-full items-center'>
                    <input placeholder='search college name' className='p-2 h-12 text-xl lg:w-[50%]' type="text" />
                    <button className='text-white bg-green-800 px-4 h-12 lg:text-2xl text-xl'>Search</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
