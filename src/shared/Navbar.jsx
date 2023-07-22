import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-gray-200">
            <div className="my-container hidden lg:flex justify-between items-center py-4">
                <h1 className="text-3xl font-bold italic">CampusLink</h1>
                <ul className="flex gap-5 text-lg">
                    <NavLink className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/colleges">Colleges</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/admission">Admission</NavLink>
                    <NavLink className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/myCollege">My college</NavLink>
                </ul>
            </div>

            {/* phone */}
            <div className="lg:hidden flex justify-between items-center py-2 my-container">
                <h1 className="text-2xl font-bold italic">CampusLink</h1>
                <FaBars onClick={() => setIsOpen(true)} className="text-xl"></FaBars>
                {
                    isOpen && <div className="absolute top-0 left-0 w-full bg-white z-30">
                        <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-2xl">
                            <HiXMark></HiXMark>
                        </button>
                        <ul className="flex flex-col gap-2 items-center py-5 text-lg">
                            <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/">Home</NavLink>
                            <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/colleges">Colleges</NavLink>
                            <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/admission">Admission</NavLink>
                            <NavLink onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? 'text-green-500' : ''} to="/myCollege">My college</NavLink>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;