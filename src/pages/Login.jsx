import React, { useState } from 'react';
import CurrencyBroSvg from "../images/CurrencyBroSvg.svg"
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import axios from 'axios';
import { login } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { backendUrl } from '../utils/data';

const Login = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are required")
            return
        }


        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/login`, { email, password });

            if (response && response.data.success) {
                const { data } = response;
                dispatch(login(data));
                toast.success('Login successfully 😇', { position: "top-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored", });

                navigate("/");
                e.target[0].value = "";
                e.target[1].value = "";
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

                <div className="left w-1/2 hidden sm:block border-r-2 border-purple-700">

                    <img className='w-[95%]' src={CurrencyBroSvg} alt="" />
                </div>

                <div className='right w-full sm:w-1/2 h-full '>
                    <h2 className='text-purple-700 text-xl md:text-2xl text-center font-semibold my-3'>Login</h2>

                    <form className='p-3' onSubmit={handleLogin}>
                        <Input type="email" name="email" label="Email *" value={email} onChangeFunction={setEmail} />

                        <Input type="password" name="password" label="Password *" value={password} onChangeFunction={setPassword} />

                        <button className='my-3 text-white bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-gradient-to-bl focus:outline-none py-1 px-2 rounded-md' type="submit">Login</button>



                    </form>
                    {loading && <Loader />}

                    {
                        error && <p className='px-3 text-red-500'><span className='font-semibold'>Error:</span>{error}</p>
                    }
                    <p className='px-3 text-blue-600'>Don't have an account <Link to="/signup" className='underline'>Create account</Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Login