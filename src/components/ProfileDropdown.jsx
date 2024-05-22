import React from 'react';
import { PiCoinsFill } from "react-icons/pi";
import { MdHelp } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
// import { BiSolidChat } from "react-icons/bi";
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { GoHeartFill } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';


const ProfileDropdown = ({ openProfileDropDown, setOpenProfileDropDown }) => {

    const dispatch = useDispatch();
    const { userData } = useSelector(store => store.user);
    const navigate = useNavigate("")


    const handleClick = () => {
        setOpenProfileDropDown(false)
    }

    const handleLogout = () => {
        navigate("/")
        dispatch(logout());
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const q = e.target[0].value;
        handleClick();
        if (q.trim()) navigate(`/search/${q}`);

    }


    return (
        <>
            <div className='bg-white z-20 fixed w-full h-screen top-14 left-0 md:right-5 md:top-16 md:h-auto md:w-72 md:left-[75%] rounded-none md:rounded-md shadow-lg shadow-purple-100 border-0 md:border md:border-purple-500'>

                <div className="d-flex gap-3 overflow-hidden p-3">
                    <img className='w-14 h-14 rounded-full' src={userData ? userData?.profileImgUrl : "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"} alt="profile-img" />
                    <h3 className='text-2xl font-semibold text-ellipsis dot-text font-serif text-purple-900'>
                        {userData ? userData?.name : "Your Name"}
                    </h3>
                </div>

                <div className='flex p-1 justify-center my-1 border-0 border-b border-purple-500'>
                    <Link to={`/profile/${userData?._id}`} onClick={handleClick} className='px-8 py-1.5 text-slate-50 bg-purple-700 text-lg rounded-md '>Profile</Link>
                </div>

                <div className='w-11/12 my-5 mx-auto'>
                    <form className='flex md:hidden w-full' onSubmit={handleSearch}>
                        <input className='text-lg px-2 py-1 w-full border-2 rounded-lg border-purple-700 outline-none border-r-0 rounded-r-none' placeholder='Search Coins or notes' type="search" name="search" id="search" />
                        <button className='bg-purple-700 text-slate-50 p-3 rounded-lg rounded-l-none' ><FaMagnifyingGlass className='text-xl' /></button>
                    </form>
                </div>

                <ul className='p-3'>
                    <li ><Link to={`/profile/${userData?._id}`} onClick={handleClick} className='d-flex gap-2 p-2 text-lg text-purple-900'><PiCoinsFill className='text-xl text-purple-700' /> My ADS</Link></li>

                    {/* <li ><Link onClick={handleClick} className='d-flex gap-2 p-2 text-lg text-purple-900' to="/chats"><BiSolidChat className='text-xl text-purple-700' /> Chats</Link></li> */}

                    <li ><Link to={`/wishlist/${userData?._id}`} onClick={handleClick} className='d-flex gap-2 p-2 text-lg text-purple-900'><GoHeartFill className='text-xl text-purple-700' /> My Wishlist</Link></li>

                    <li ><Link to={`/editprofile/${userData?._id}`} onClick={handleClick} className='d-flex gap-2 p-2 text-lg text-purple-900'><IoSettingsSharp className='text-xl text-purple-700' /> Settings</Link></li>

                    <li ><a onClick={handleClick} className='d-flex gap-2 p-2 text-lg text-purple-900' href="https://github.com/AyushVerma2772"><MdHelp className='text-xl text-purple-700' /> Help</a></li>

                    <li className='d-flex justify-center mt-2'>
                        {
                            userData ?
                                <button className='text-white bg-red-500 px-4 py-1.5 rounded-md' onClick={handleLogout}>Logout</button>
                                :
                                <Link to="/login" type="button" className="text-white bg-gradient-to-br from-green-700 to-lime-500 hover:bg-gradient-to-bl focus:outline-none rounded-3xl text-lg font-bold px-4 py-1.5 text-center tracking-wider d-flex gap-1">Login</Link>
                        }
                    </li>
                </ul>

            </div>
        </>
    )
}

export default ProfileDropdown