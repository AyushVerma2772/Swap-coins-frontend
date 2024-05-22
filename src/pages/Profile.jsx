import React, { useEffect, useState } from 'react';
import Input from "../components/Input";
import Card from '../components/Card';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { backendUrl } from '../utils/data';

const Profile = () => {
    const { userId } = useParams();
    const { token, userData } = useSelector(store => store.user);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isChanged, setIsChanged] = useState(false);

    // console.log(userData)



    const getUserInfo = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${backendUrl}/userinfo/${userId}`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            setUserInfo(response.data);

            console.log(response.data)
            // console.log(userInfo)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }


    const handleEditProfile = (e) => {
        e.preventDefault();
    }


useEffect(() => {
        getUserInfo();
        // console.log(userInfo)

        // eslint-disable-next-line
    }, [userId, isChanged])


    return (
        <>

            {
                !userInfo && isLoading ? <Loader />
                    :

                    <main className='py-3 px-4 md:px-6 md:py-5 block md:flex gap-3'>
                        <section className='md:w-[30%] w-full md:p-4 p-3 border border-purple-400 rounded-md h-max'>

                            <div className="d-flex justify-center mb-5 md:mb-7">
                                <figure className='w-40 h-40'>
                                    <img className='w-full h-full rounded-md' src={userInfo?.profileImgUrl} alt="" />
                                </figure>
                            </div>

                            <div action="" onSubmit={handleEditProfile}>
                                <Input type="text" name="userName" label="Name" readOnly={true} value={userInfo?.name} />
                                <Input type="text" name="userName" label="Mobile Number" readOnly={true} value={userInfo?.phoneNumber} />
                                <Input type="email" name="userEmail" label="Email" readOnly={true} value={userInfo?.email} />
                                <Input name="address" label="Address" type="text" readOnly={true} value={`${userInfo?.address.localAddress}\n${userInfo?.address.state}\n${userInfo?.address.city}`} isTextArea={true} />

                                {
                                    userInfo && userData._id === userId && <Link to={`/editprofile/${userData._id}`} className='px-8 py-1.5 w-max text-slate-50 bg-purple-700 text-lg rounded-md block mx-auto'>Edit Profile</Link>

                                }

                            </div>


                        </section>


                        <section className='md:w-[70%] w-full mt-4 md:mt-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-5 md:gap-7 lg:gap-9'>

                            {
                                userInfo?.ads.map((ele, i) => (
                                    <Card key={i} adInfo={ele} setIsChanged={setIsChanged} />
                                ))
                            }


                        </section>

                    </main>
            }
        </>
    )
}

export default Profile