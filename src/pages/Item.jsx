import React, { useEffect, useState } from 'react';
import ImageSlider from '../components/ImageSlider';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CardContainer from '../components/CardContainer';
import Loader from "../components/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { edit } from '../redux/userSlice';
import { backendUrl } from '../utils/data';

const Item = () => {

    const { adId } = useParams();
    // const { data: adInfo, isLoading } = useGetAdQuery(adId);
    const [isLoading, setIsLoading] = useState(false);
    const [adInfo, setAdInfo] = useState(null);
    const [relatedAds, setRelatedAds] = useState([]);
    const { token, userData } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const getAd = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/ads/${adId}`, { headers: { Authorization: `${token}` } });

            if (response.data.success) {
                setAdInfo(response.data.ad)
            }

        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
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
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getAd();

        // eslint-disable-next-line
    }, [adId])


    const getRelatedAds = async (category) => {
        try {
            const response = await axios.get(`${backendUrl}/ads?category=${category}`);
            setRelatedAds(response.data.ads);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (adInfo) {
            getRelatedAds(adInfo?.category);
        }

    }, [adInfo])




    return (
        <>
            <main className='py-3 px-3 md:px-6 md:py-5'>
                {
                    isLoading && !adInfo
                        ?
                        <Loader />

                        :

                        <div className='md:flex gap-2'>

                            <section className='image-section md:w-[65%] w-full md:p-2 p-1'>
                                <ImageSlider images={adInfo ? adInfo?.images : ["https://res.cloudinary.com/dk8wivo54/image/upload/v1714924167/swapCoins/adImages/eyg6jjdwf49q1m57ioob.jpg"]} />
                            </section>


                            <section className='detail-section md:w-[35%] w-full md:p-2 p-1 mt-4 md:mt-0'>

                                <div className="w-full bg-white border border-purple-400 rounded-md md:p-2.5 p-2 flex flex-col gap-1.5 md:gap-2">
                                    <div className="d-flex justify-between">
                                        <h1 className='dot-text text-xl md:text-2xl font-medium'>{adInfo?.title}</h1>

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



                                    </div>
                                    <h2 className='text-lg md:text-xl font-medium'>₹ {adInfo?.price}</h2>

                                    <div>
                                        <h2 className='text-lg md:text-xl font-medium'>Description</h2>
                                        <p className="text-sm">{adInfo?.description}</p>
                                    </div>

                                    <p className="text-sm">
                                        <span className='font-semibold'>Category: </span>{adInfo?.category}
                                    </p>

                                    <p className="text-sm">
                                        <span className='font-semibold'>Condition: </span>{adInfo?.condition}
                                    </p>
                                    <p className="text-sm">
                                        <span className='font-semibold'>Year: </span>{adInfo?.year}
                                    </p>
                                    <p className="text-sm">
                                        <span className='font-semibold'>Metal: </span>{adInfo?.metal}
                                    </p>

                                </div>


                                <div className="w-full bg-white border border-purple-400 rounded-md p-2 mt-2 md:mt-3">

                                    <h2 className='text-lg md:text-xl font-semibold'>Posted by</h2>

                                    <div className='mt-2'>
                                        <div className='d-flex  gap-3 md:gap-4'>
                                            <img className='w-10 h-10 md:w-12 md:h-12 rounded-full' src={adInfo?.owner.profileImgUrl} alt="img" />

                                            <Link to={`/profile/${adInfo?.owner._id}`} className='text-base md:text-lg font-medium'>{adInfo?.owner.name}</Link>
                                        </div>

                                        <p className="mt-2 text-sm">
                                            <span className='font-semibold'>Mobile number: </span>{adInfo?.owner.phoneNumber}
                                        </p>

                                        <p className="mt-2 text-sm">
                                            <span className='font-semibold'>Address: </span> {adInfo?.owner.address.localAddress}
                                        </p>
                                        <p className="text-sm">{adInfo?.owner.address.state}</p>
                                        <p className="text-sm leading-3">{adInfo?.owner.address.city}</p>

                                        <p className="mt-2 text-sm">
                                            <span className='font-semibold'>Posted At: </span> {new Date(adInfo?.createdAt).toLocaleString()}
                                        </p>

                                        <a href={`https://api.whatsapp.com/send/?phone=%2B91${adInfo?.owner.phoneNumber}&text=Hello%2C%20My%20name%20is%20${encodeURIComponent(userData?.name)}.%20I%20came%20across%20your%20advertisement%20on%20SwapCoins%20and%20I'm%20interested%20in%20it.%20Could%20you%20please%20provide%20me%20more%20information%20about%20the%20item%3F%20Here%20is%20the%20link%20to%20the%20advertisement%3A%20${encodeURIComponent(window.location.href)}.%20Thank%20you.&type=phone_number&app_absent=0`}
                                            target='_blank' rel="noreferrer" className='block w-full text-center border-2 rounded-md border-purple-700 py-2 mt-3 md:mt-4 hover:bg-purple-700 hover:text-white'>
                                            Chat with seller
                                        </a>

                                    </div>
                                </div>
                            </section>
                        </div>
                }

                {
                    adInfo && relatedAds.length ?
                        <div>
                            <h2 className='text-xl md:text-2xl font-medium my-3 md:my-5'>Related Ads</h2>

                            <CardContainer ads={relatedAds} />
                        </div>
                        :
                        <Loader />
                }
            </main>


        </>
    )
}

export default Item