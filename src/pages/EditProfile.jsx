import React, { useState } from 'react'
import { CitySelect, StateSelect } from 'react-country-state-city/dist/cjs';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import editProfileBoy from "../images/editProfileBoy.svg"
import axios from "axios";
import { edit } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Input from '../components/Input';
import { backendUrl } from '../utils/data';




const EditProfile = () => {
    const [stateid, setstateid] = useState(0);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { userId } = useParams();
    const { userData, token } = useSelector(store => store.user);
    const [name, setName] = useState(userData.name);
    const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
    const [localAddress, setLocalAddress] = useState(userData.address.localAddress);
    const dispatch = useDispatch();

    if (userData._id !== userId) {
        return <Navigate to="/" />
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleEdit = async (e) => {
        e.preventDefault();


        setLoading(true);
        try {
            const formData = new FormData();

            if (name) formData.append("name", name);
            if (phoneNumber) formData.append("phoneNumber", phoneNumber);
            if (image) formData.append("profileImg", image);
            formData.append("state", e.target[3].value || userData.address.state);
            formData.append("city", e.target[4].value || userData.address.city);
            if (localAddress) formData.append("localAddress", localAddress);

            const response = await axios.patch(`${backendUrl}/userinfo/edit/${userId}`, formData, {
                headers: {
                    Authorization: `${token}`
                }
            });

            const { data } = response;
            if (data.success) {
                dispatch(edit({ userData: data.updatedUser }));
                navigate(`/profile/${userId}`);
            }

        } catch (error) {
            setError(error.message);
            console.log(error);
        }
        setLoading(false);
    }




    return (
        <div className='min-h-screen w-full py-5'>
            <h1 className='text-2xl md:text-3xl text-purple-700 lg:text-4xl font-semibold text-center py-5'>Edit your profile</h1>

            <div className='border rounded-2xl border-purple-400 shadow-lg shadow-purple-400 mx-auto w-[90%] md:w-3/4 p-3 mt-2 bg-white d-flex gap-2'>

                <div className='right w-full sm:w-1/2 border-r-2 border-purple-700'>

                    {/* Change image on change */}
                    {image ?
                        <figure className='mx-auto w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36'>
                            <img className='w-full h-full rounded-md' src={URL.createObjectURL(image)} alt="" />
                        </figure> :
                        <figure className='mx-auto w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36'>
                            <img className='w-full h-full rounded-md' src={userData?.profileImgUrl} alt="" />
                        </figure>
                    }

                    <form method='POST' className='p-3' onSubmit={handleEdit}>
                        <Input type="text" name="name" value={name} label="Name *" readOnly={false} onChangeFunction={setName} />

                        <Input type="number" name="phoneNumber" value={phoneNumber} label="Phone number *" onChangeFunction={setPhoneNumber} />


                        <div className='my-5'>

                            <h3 className='text-purple-700' htmlFor="profileImg">Upload profile image*</h3>

                            <div className='d-flex gap-3'>
                                <label className='bg-purple-700 px-4 py-1 text-white rounded-full' htmlFor="profileImg">Upload</label>
                                <input className='hidden' type="file" name="profileImg" id="profileImg" accept="image/*" onChange={(e) => handleImageChange(e)} />
                                {image && <p>{image.name}</p>}
                            </div>
                        </div>

                        <div className='d-flex justify-start gap-2 md:gap-5'>
                            <label htmlFor="select-state" className='text-purple-700 focus:text-purple-900 my-5'>Location</label>
                            <StateSelect countryid={101} onChange={(e) => { setstateid(e.id); }} placeHolder="Select State" />

                            <CitySelect countryid={101} stateid={stateid} placeHolder="Select City" />
                        </div>

                        <div className="mt-7 md:mt-10" >
                            <Input name="address" label="Address" type="text" isTextArea={true} value={localAddress} onChangeFunction={setLocalAddress} />
                        </div>

                        <button className='my-3 text-white bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-gradient-to-bl focus:outline-none py-1 px-2 rounded-md' type="submit">Save</button>


                    </form>

                    {loading && <Loader />}

                    {
                        error && <p className='px-3 text-red-500'><span className='font-semibold'>Error:</span>{error}</p>
                    }

                </div>

                <div className="left w-1/2 hidden sm:block">
                    <h3 className='text-xl my-3 text-center text-purple-700'>Edit your profile</h3>

                    <img className='w-[95%] mx-auto' src={editProfileBoy} alt="saving money svg" />

                    <h3 className='text-xl my-3 text-center text-purple-700'>Increase your collection with us ❤️</h3>
                </div>
            </div>
        </div>
    )
}


export default EditProfile