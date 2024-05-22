import React, { useState } from 'react'
import { CitySelect, StateSelect } from 'react-country-state-city/dist/cjs';
import { Link, useNavigate } from "react-router-dom";
import savingMoneyBro from "../images/savingMoneyBro.svg"
import axios from "axios";
import { register } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Input from '../components/Input';
import { backendUrl } from '../utils/data';



const Signup = () => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [stateId, setStateId] = useState(0);
    const [state, setState] = useState("");
    const [city, setCity] = useState("")
    const [localAddress, setLocalAddress] = useState('');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [otpMessage, setOtpMessage] = useState("");
    // const [verifyNumber, setVerifyNumber] = useState(false);
    // const [otpSent, setOtpSent] = useState(false);
    // const [otp, setOtp] = useState(0);



    // const sendOtp = async () => {
    //     setOtpMessage("OTP sent successfully")
    //     if (!phoneNumber) {
    //         setError("Enter phone number");
    //         return
    //     }

    //     try {
    //         const response = await axios.post("${backendUrl}/send-otp", { phoneNumber });
    //         setOtpMessage(response.data.message);
    //         if (response.data.success) setOtpSent(true)

    //     } catch (error) {
    //         console.log(error);
    //         setError(error.message)
    //     }
    // }

    // const verifyOtp = async () => {
    //     if (!phoneNumber || otp === 0) {
    //         setError("Enter both phone number and otp");
    //         return
    //     }

    //     try {
    //         const response = await axios.post("${backendUrl}/verify-otp", { phoneNumber, code: otp });
    //         setOtpMessage(response.data.message);

    //         if (response.data.success) setVerifyNumber(true);
    //         else setVerifyNumber(false);

    //     } catch (error) {
    //         console.log(error);
    //         setError(error.message)
    //     }
    // }



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !phoneNumber || !email || !password || !image || !state || !city || !localAddress) {
            setError("All fields are required")
            return
        }

        // if (!verifyNumber) {
        //     setError("Number is not verified");
        //     return
        // }

        const formData = new FormData();

        formData.append("name", name);
        formData.append("phoneNumber", phoneNumber);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profileImg", image);
        formData.append("state", state);
        formData.append("city", city);
        formData.append("localAddress", localAddress);

        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/signup`, formData);

            if (response && response.data.success) {
                const { data } = response;
                dispatch(register(data));

                navigate("/");
                setName("");
                setEmail("");
                setPhoneNumber("");
                setPassword("")
                setState("");
                setCity("")
                setLocalAddress("")
                setImage(null);

            }


            else {
                setError(response.data.message);
            }


        } catch (error) {
            console.log(error);
            setError(error.message)
        }
        setLoading(false);

    }

    return (
        <div className='min-h-screen w-full bg-purple-600 py-5 login-page'>
            <h1 className='text-3xl md:text-4xl text-white lg:text-5xl font-semibold text-center py-5'>Swap your coins</h1>

            <div className='border rounded-2xl border-purple-400 shadow-lg shadow-purple-400 mx-auto w-[90%] md:w-3/4 p-3 mt-2 bg-white d-flex gap-2'>

                <div className='right w-full sm:w-1/2 border-r-2 border-purple-700'>
                    <h2 className='text-purple-700 text-xl md:text-2xl text-center font-semibold my-3'>Create your account</h2>

                    <form method='POST' className='p-3' onSubmit={handleSignup}>
                        <Input type="text" name="name" label="Name *" value={name} onChangeFunction={setName} />

                        <Input type="number" name="phoneNumber" label="Phone number *" value={phoneNumber} onChangeFunction={setPhoneNumber} />

                        <Input type="email" name="email" label="Email *" value={email} onChangeFunction={setEmail} />


                        <Input type="password" name="password" label="Password *" value={password} onChangeFunction={setPassword} />


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
                            <StateSelect countryid={101} onChange={(e) => { setStateId(e.id); setState(e.name) }} placeHolder="Select State" />

                            <CitySelect countryid={101} stateid={stateId} placeHolder="Select City" onChange={e => setCity(e.name)} />
                        </div>

                        <div className="mt-7 md:mt-10" >
                            <Input name="address" label="Address" type="text" isTextArea={true} value={localAddress} onChangeFunction={setLocalAddress} />
                        </div>


                        {/* Send OTP code */}
                        {
                            //     <div className="flex">
                            //         <div className="w-[70%]"><Input type="number" name="phoneNumber" label="Phone number *" value={phoneNumber} onChangeFunction={setPhoneNumber} /></div>

                            //         <button className='h-max px-2 py-1 text-white bg-green-500 rounded-md' onClick={sendOtp}>Send OTP</button>
                            //     </div>
                            // {
                            //     otpSent && <div className="flex">
                            //         <div className="w-[70%]"><Input type="number" name="otp" label="OTP *" value={otp} onChangeFunction={setOtp} /></div>

                            //         <button className='h-max px-2 py-1 text-white bg-orange-500 rounded-md' onClick={verifyOtp}>Verify OTP</button>
                            //     </div>
                            // }

                            // {
                            //     otpMessage && <p className='text-orange-500'>{otpMessage}</p>
                            // }
                        }

                        <button className='my-3 text-white bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-gradient-to-bl focus:outline-none py-1 px-2 rounded-md disabled:cursor-not-allowed' type="submit">Create account</button>


                    </form>

                    {loading && <Loader />}

                    {
                        error && <p className='px-3 text-red-500'><span className='font-semibold'>Error:</span>{error}</p>
                    }
                    <p className='px-3 mt-3 text-blue-600'>Already have an account <Link to="/login" className='underline'>Login</Link> </p>
                </div>

                <div className="left w-1/2 hidden sm:block">
                    <h3 className='text-xl my-3 text-center text-purple-700'>Get coins and notes for you collections</h3>

                    <img className='w-[95%] mx-auto' src={savingMoneyBro} alt="saving money svg" />

                    <h3 className='text-xl my-3 text-center text-purple-700'>Increase your collection with us ❤️</h3>
                </div>
            </div>
        </div>
    )
}

export default Signup;