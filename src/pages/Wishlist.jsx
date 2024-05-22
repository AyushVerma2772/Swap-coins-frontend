import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import CardContainer from '../components/CardContainer';
import Loader from '../components/Loader';
import axios from 'axios';
import { backendUrl } from '../utils/data';


const Wishlist = () => {
    const { userId } = useParams();
    const { userData, token } = useSelector(store => store.user);
    const [ads, setAds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);


    const getAdFromWishlist = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${backendUrl}/wishlist`, {
                headers: {
                    Authorization: `${token}`
                }
            })

            // console.log(response.data)

            if (response.data.success) {
                setAds(response.data.wishlist)
            }

        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAdFromWishlist();
    
        // eslint-disable-next-line
    }, [isChanged])


    if (userData._id !== userId) {
        return <Navigate to="/" />
    }

    return (
        <>
            <main className='py-3 px-4 md:px-6 md:py-5'>

                <h1 className='text-xl text-purple-800 md:text-2xl mb-3 tracking-wide'>Your wishlist</h1>

                {
                    isLoading && !ads && !ads.length ? <Loader />
                        :
                        <CardContainer setIsChanged={setIsChanged} ads={ads} />
                }

            </main>
        </>
    )
}

export default Wishlist