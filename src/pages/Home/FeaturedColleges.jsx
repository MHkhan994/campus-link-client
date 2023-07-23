import React from 'react';
import UseColleges from '../../hooks/UseColleges';
import { Link } from 'react-router-dom';

const FeaturedColleges = () => {

    const { colleges } = UseColleges()
    console.log(colleges.slice(0, 3));

    return (
        <div className='py-14 my-container'>
            <h1 className='font-semibold text-3xl text-center pb-6'>Featured Colleges</h1>
            <div className='grid lg:grid-cols-3 justify-between gap-4'>
                {
                    colleges.slice(0, 3).map(college => <div className='bg-gray-100 p-1 shadow-lg border rounded-md' key={college._id}>
                        <img className='rounded-md' src={college.image} alt="" />
                        <div className='p-2 space-y-1'>
                            <h1 className='text-xl font-semibold'>{college.name}</h1>
                            <p><span className='text-lg font-semibold'>Admission Date: </span> {college.admissionDate}</p>
                            <div>
                                <span className='text-lg font-semibold'>Upcomming Events: </span>
                                {
                                    college.events.map(e => <li key={e.id}>{e.name}</li>)
                                }
                            </div>
                            <p><span className='text-lg font-semibold'>Sports: </span> {college.sports.length}</p>
                        </div>
                        <button className='flex justify-center w-full pb-3'>
                            <Link className='my-btn' to={`/college/${college._id}`}>Details</Link>
                        </button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default FeaturedColleges;