import React from 'react';
import UseColleges from '../../hooks/UseColleges';

const FeaturedColleges = () => {

    const { colleges } = UseColleges()

    return (
        <div className='pt-14 my-container'>
            <h1 className='font-semibold text-3xl text-center'>Featured Colleges</h1>
            <div className='grid lg:grid-cols-3 justify-between gap-4'>
                {
                    colleges.splice(0, 3).map(college => <div key={college._id}>
                        <img src={college.collegeImage} alt="" />
                        <h1>{college.collegeName}</h1>
                    </div>)
                }
            </div>
        </div>
    );
};

export default FeaturedColleges;