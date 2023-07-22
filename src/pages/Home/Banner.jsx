import { useState } from 'react';
import banner from '../../assets/banner.jpg'
import axios from 'axios';
import CollegeCard from '../Colleges/CollegeCard';
import { HiXMark } from "react-icons/hi2";

const Banner = () => {

    const [colleges, setColleges] = useState(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const text = e.target.text.value;
        if (text?.length > 0) {
            axios.get(`http://localhost:5000/college/search/${text}`)
                .then(res => {
                    console.log(res);
                    e.target.reset()
                    setColleges(res.data)
                    window.my_modal_4.showModal()
                })
        }
    }

    const hanldeCloseModal = () => {
        setColleges(null)
    }

    return (
        <div className='relative mt-10'>
            <img className='lg:h-[80vh] h-[50vh] w-full object-cover' src={banner} alt="" />
            <div className='absolute w-full lg:h-[80vh] h-[50vh] bg-[#00000049] z-20 top-0 left-0'>
                <form onSubmit={handleSearch} className='my-container flex justify-center h-full items-center'>
                    <input name='text' placeholder='search college name' className='p-2 h-12 text-xl lg:w-[50%]' type="text" />
                    <button className='text-white bg-green-800 px-4 h-12 lg:text-2xl text-xl'>Search</button>
                </form>
                <dialog id="my_modal_4" className="modal">
                    <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                        <button onClick={hanldeCloseModal}>
                            <HiXMark className='text-4xl'></HiXMark>
                        </button>
                        {
                            colleges && <div className='grid lg:grid-cols-2 gap-10'>
                                {
                                    colleges.map(college => <CollegeCard key={college._id} college={college}></CollegeCard>)
                                }
                            </div>
                        }
                        {
                            colleges?.length === 0 && <div className='flex justify-center items-center'>
                                <h1 className='text-xl text-orange-500'>No matching colleges found!!</h1>
                            </div>
                        }
                        <div className="modal-action">
                            {/* if there is a button, it will close the modal */}
                            <button onClick={hanldeCloseModal} className="btn">Close</button>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default Banner;
