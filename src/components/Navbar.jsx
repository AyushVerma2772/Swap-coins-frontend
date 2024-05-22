import React, { useState } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SlArrowDown } from "react-icons/sl";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import SwapCoinsLogo from "../images/SwapCoinsLogo.png";
import ProfileDropdown from './ProfileDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa6";


const Navbar = () => {

  const [openProfileDropDown, setOpenProfileDropDown] = useState(false);
  const { userData } = useSelector(store => store.user)


  const navigate = useNavigate();
  const handleSearch = (e) => {

    e.preventDefault();
    const q = e.target[0].value;
    if (q.trim()) navigate(`/search/${q}`);

  }


  return (
    <>
      <nav className="d-flex w-full px-3 py-1.5 justify-between shadow-md shadow-purple-100 sticky top-0 z-[15] bg-white">

        <div className='d-flex gap-3'>
          <button className="md:hidden cursor-pointer text-purple-700" onClick={() => setOpenProfileDropDown(!openProfileDropDown)}>
            {
              openProfileDropDown ? <RxCross2 className='text-3xl' /> : <RiMenu4Fill className='text-3xl' />
            }
          </button>

          <a className='d-flex gap-3 w-12 md:w-14' href="/">
            <img src={SwapCoinsLogo} alt="logo" className='w-12 h-12 md:w-14' />
            <span className='hidden md:block text-2xl font-bold text-purple-700 font-sans'>Swap Coins</span>
          </a>
        </div>


        <div className='w-[40%]'>
          <form className='hidden md:flex w-full' onSubmit={handleSearch} >
            <input className='text-lg px-2 py-1 w-full border-2 rounded-lg border-purple-700 outline-none border-r-0 rounded-r-none placeholder:text-purple-500/80' placeholder='Search Coins or notes' type="search" name="search" id="search" />
            <button className='bg-purple-700 text-slate-50 p-3 rounded-lg rounded-l-none'><FaMagnifyingGlass className='text-xl' /></button>
          </form>
        </div>


        <div className='d-flex relative gap-5 md:gap-7'>

          {userData && <Link to={`/wishlist/${userData?._id}`} className='text-3xl text-purple-700 cursor-pointer md:text-4xl'>
            <FaHeart />
            <span className='w-5 h-5 absolute top-[25%] left-[3.5%] text-xl d-flex justify-center rounded-full text-white'>{userData?.wishlist.length}</span>
          </Link>}

          <div className='d-flex gap-2'>

            {
              userData &&
              <Link to={`/profile/${userData?._id}`} className='w-10'>
                <img className='w-10 h-10 rounded-full object-center' src={userData?.profileImgUrl} alt="profile-img" />
              </Link>
            }

            <button onClick={() => setOpenProfileDropDown(!openProfileDropDown)} className='hidden lg:block font-extrabold text-purple-700'>
              <SlArrowDown />
            </button>
          </div>

          {
            userData ?
              <Link to="/post" type="button" className="text-white bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-gradient-to-bl focus:outline-none rounded-3xl text-lg font-bold px-4 py-1.5 text-center tracking-wider d-flex gap-1"><FaPlus /> Sell</Link>
              :
              <Link to="/login" type="button" className="text-white bg-gradient-to-br from-green-700 to-lime-500 hover:bg-gradient-to-bl focus:outline-none rounded-3xl text-lg font-bold px-4 py-1.5 text-center tracking-wider d-flex gap-1">Login</Link>
          }
        </div>

        {
          openProfileDropDown && <ProfileDropdown openProfileDropDown={openProfileDropDown} setOpenProfileDropDown={setOpenProfileDropDown} />
        }
      </nav>
    </>
  )
}

export default Navbar