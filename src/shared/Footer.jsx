import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='mt-20 py-10 bg-green-100 lg:h-[50vh] flex flex-col gap-10 justify-between'>
            <div className='flex lg:flex-row flex-col justify-between my-container gap-6 lg:w-[50%]'>
                <div className='flex flex-col items-center lg:items-start gap-3 justify-between h-full'>
                    <h1 className='text-3xl font-semibold text-gray-700 pb-4'>Campus Link</h1>
                    <div className='text-lg'>
                        <p>123 Main Street</p>
                        <p>Springfield, IL 62701</p>
                        <p>USA</p>
                    </div>
                    <div className='flex gap-4 text-2xl'>
                        <FaFacebook></FaFacebook>
                        <FaInstagram></FaInstagram>
                        <FaTwitter></FaTwitter>
                    </div>
                </div>
                <div className='flex flex-col items-center lg:items-start gap-4'>
                    <p>New to Campus Link?</p>
                    <button className='my-btn'>
                        <Link to={'/register'}>Register</Link>
                    </button>
                </div>
                <div className='flex items-center flex-col gap-4'>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/colleges">Colleges</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/admission">Admission</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/myCollege">My college</NavLink>
                </div>
            </div>
            <p className='text-center'>Copyright @ 2020-2023 All rights reserved - campus link</p>
        </div>
    );
};

export default Footer;