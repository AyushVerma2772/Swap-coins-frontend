import React, { useState } from 'react';
import "react-country-state-city/dist/react-country-state-city.css";
import axios from "axios";
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { backendUrl, categories, conditions, metals } from '../utils/data';
import Input from '../components/Input';



const Post = () => {
    const { token } = useSelector(store => store.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [previewImages, setPreviewImages] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [metal, setMetal] = useState('');

    const handlePreviewImages = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setPreviewImages(selectedFiles.map(file => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !price || !year || !category || !condition || !metal || !e.target[7].files.length) {
            setError("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('year', year);
        formData.append('category', category);
        formData.append('condition', condition);
        formData.append('metal', metal);

        const fileInput = e.target[7];
        for (let i = 0; i < fileInput.files.length; i++) {
            formData.append('images', fileInput.files[i]);
        }

        setLoading(true);
        try {
            await axios.post(`${backendUrl}/ad/create`, formData, {
                headers: {
                    Authorization: token,
                    "Content-Type": "'multipart/form-data'"
                }
            });
            e.target.reset();
            navigate("/");
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    return (
        <>
            <main className='py-3 px-4 md:px-6 md:py-5'>
                <h1 className='text-2xl md:text-3xl mb-3 tracking-wide text-center'>POST YOUR AD</h1>
                <form className='border border-purple-400 mx-auto w-[90%] md:w-3/4 py-3 rounded-lg' onSubmit={handleSubmit}>
                    <div className='px-3 pb-5 border-0 border-b border-slate-400 my-3'>
                        <Input type="text" name="title" label="Ad title *" value={title} onChangeFunction={setTitle} />
                        <Input type="text" name="description" label="Description *" isTextArea={true} value={description} onChangeFunction={setDescription} />
                        <Input type="number" name="price" label="Set a price *" value={price} onChangeFunction={setPrice} />
                        <Input type="number" name="year" label="Year of coin *" value={year} onChangeFunction={setYear} />

                        <div className='d-flex gap-5 md:gap-7 lg:gap-9 flex-wrap'>
                            <div>
                                <label htmlFor="category" className='text-purple-700 focus:text-slate-900 my-5'>Select category *</label>
                                <select className='py-1 px-2 block border bg-purple-100 my-2 rounded-md outline-none cursor-pointer' name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="">All Categories</option>
                                    {categories.map((ele, i) => <option className='bg-white' key={i} value={ele}>{ele}</option>)}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="condition" className='text-purple-700 focus:text-slate-900 my-5'>Select condition *</label>
                                <select className='py-1 px-2 block border bg-purple-100 my-2 rounded-md outline-none cursor-pointer' name="condition" id="condition" value={condition} onChange={e => setCondition(e.target.value)}>
                                    <option value="">All Conditions</option>
                                    {conditions.map((ele, i) => <option className='bg-white' key={i} value={ele}>{ele}</option>)}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="metal" className='text-purple-700 focus:text-slate-900 my-5'>Metal of coin *</label>
                                <select className='py-1 px-2 block border bg-purple-100 my-2 rounded-md outline-none cursor-pointer' name="metal" id="metal" value={metal} onChange={e => setMetal(e.target.value)}>
                                    <option value="">Metal</option>
                                    {metals.map((ele, i) => <option className='bg-white' key={i} value={ele}>{ele}</option>)}
                                </select>
                            </div>
                        </div>

                        <label htmlFor="profileImg" className='text-purple-700 focus:text-slate-900 mt-6 mb-2 block'>Upload Photos</label>
                        <div className=''>
                            <div className='d-flex gap-3'>
                                <label className='bg-purple-700 px-4 py-1 text-white rounded-full' htmlFor="profileImg">Upload images of your</label>
                                <input className='hidden' type="file" name="profileImg" id="profileImg" accept="image/*" multiple={true} onChange={handlePreviewImages} />
                            </div>
                            <div className='w-full flex-wrap mt-3 d-flex gap-3'>
                                {previewImages.length !== 0 && previewImages.map((ele, i) => (
                                    <img className='w-24 h-24 rounded' key={i} src={ele} alt="" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {loading && <Loader />}
                    {error && <p className='px-3 text-red-500'><span className='font-semibold'>Error:</span>{error}</p>}
                    <button className='m-3 text-white bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-gradient-to-bl focus:outline-none py-2 px-3 rounded-md' type="submit">Post now</button>
                </form>
            </main>
        </>
    );
};

export default Post;
