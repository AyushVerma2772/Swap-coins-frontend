import React from 'react';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { edit } from '../redux/userSlice';
import { backendUrl } from '../utils/data';


const Card = ({ adInfo, setIsChanged }) => {
    // console.log(adInfo)

    const { userData, isLogin, token } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const handleDelete = async (adId) => {
        try {
            await axios.delete(`${backendUrl}/ad/delete/${adId}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            setIsChanged(true);

        } catch (error) {
            console.log(error)
        }
    }

    const handleWishlistOperation = async (adId, operation) => {
        try {
            const response = await axios.patch(`${backendUrl}/wishlist/${operation}/${adId}`, {}, {
                headers: {
                    Authorization: `${token}`
                }
            });
            const { data } = response;
            if (data.success) {
                dispatch(edit({ userData: data.updatedUser }));
            }
            setIsChanged(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='bg-white w-full md:w-11/12 2xl:w-[95%] p-1.5 md:p-2 shadow-md shadow-purple-400/20 rounded-2xl border border-purple-400/70 flex flex-col gap-1 relative h-max'>

                <div className='relative h-40 md:h-44 mb-3' >
                    <div className='z-[1] relative top-0 left-0 h-full w-full opacity-75' style={{ backgroundImage: `url(${adInfo.images[0]})`, backgroundSize: "cover", filter: "blur(2.5px)" }} >
                    </div>

                    <figure className='absolute z-[2] top-0 left-0 h-full w-full'>
                        <img className='h-full w-full object-contain' src={adInfo.images[0]} alt="" />
                    </figure>
                </div>

                <Link to={`/item/${adInfo._id}`} className='dot-text text-center font-semibold text-base md:text-lg'>{adInfo.title}</Link>

                <h2 className='font-medium text-base md:text-lg'>₹ {adInfo.price}</h2>

                <p className='dot-text text-sm md:text-base text-purple-900'>{adInfo.description}</p>

                <div className='d-flex justify-between text-xs md:text-sm gap-3'>
                    {adInfo?.owner.address && <p className='dot-text'>{adInfo?.owner.address.state}</p>}

                    <p className='dot-text'>{new Date(adInfo.createdAt).toLocaleString().split(",")[0]}</p>
                </div>

                {
                    isLogin && <div className='d-flex justify-between mt-2'>

                        {
                            !userData?.wishlist.includes(adInfo?._id) ?

                                <button className='d-flex justify-center shadow-md shadow-purple-400 w-7 h-7 md:w-9 md:h-9 bg-white rounded-full border border-purple-200 active:shadow-none transition' onClick={() => handleWishlistOperation(adInfo?._id, "add")}>
                                    <GoHeart className='text-center text-purple-900 text-xl md:text-2xl' />
                                </button>

                                :

                                <button className='d-flex justify-center shadow-md shadow-purple-400 w-7 h-7 md:w-9 md:h-9 bg-white rounded-full border border-purple-200 active:shadow-none transition' onClick={() => handleWishlistOperation(adInfo?._id, "remove")}>
                                    <GoHeartFill className='text-center text-purple-900 text-xl md:text-2xl' />
                                </button>
                        }


                        {
                            userData && (userData?._id === adInfo.owner._id || userData?._id === adInfo.owner) && <>
                                <button className='d-flex justify-center shadow-md shadow-purple-400 w-7 h-7 md:w-9 md:h-9 bg-white rounded-full border border-purple-200 active:shadow-none transition' onClick={() => handleDelete(adInfo?._id)}>
                                    <MdDelete className='text-center text-purple-900 text-xl md:text-2xl' />
                                </button>

                                <Link to={`/editad/${adInfo._id}`} state={adInfo} className='d-flex justify-center shadow-md shadow-purple-400 w-7 h-7 md:w-9 md:h-9 bg-white rounded-full border border-purple-200 active:shadow-none transition'>
                                    <FaPencilAlt className='text-center text-purple-900 text-xl md:text-2xl' />
                                </Link>
                            </>
                        }


                    </div>
                }





            </div>
        </>
    )
}

export default Card