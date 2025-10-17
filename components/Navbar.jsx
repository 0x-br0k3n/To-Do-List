import React from 'react'

const Navbar = () => {
    return (
        <nav className='h-[5vh] flex justify-around items-center'>
            <h2 className='font-bold text-2xl'>To Do Manager</h2>
            < ul className='flex gap-6 font-semibold text-lg'>
                <li className='hover:font-bold cursor-pointer'>Home</li>
                <li className='hover:font-bold cursor-pointer'>Your Progress</li>
                <li className='hover:font-bold cursor-pointer'>Contact Us</li>
            </ul>
        </nav>
    )
}

export default Navbar
