import React from 'react';
import erroImg from '../../assets/errorpage.png'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex items-center justify-center h-[100vh] flex-col'>
            <img className='lg:w-[40%]' src={erroImg} alt="" />
            <div className='text-center space-y-3 text-lg'>
                <h1 className='text-4xl text-center text-red-600 font-semibold'>Opps!</h1>
                <p>The page you are trying to find does't exist.</p>
                <p>you can go back to</p>
                <button className='my-btn'>
                    <Link to={'/'}>Home</Link>
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;