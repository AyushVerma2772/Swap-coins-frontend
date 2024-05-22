import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import axios from 'axios';
import { backendUrl, categories, conditions, metals } from '../utils/data';
import Input from '../components/Input';



const EditAd = () => {

    const { adId } = useParams();
    const { state: adInfo } = useLocation();
    const navigate = useNavigate();
    const { userData, token } = useSelector(store => store.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [title, setTitle] = useState(adInfo?.title || "");
    const [description, setDescription] = useState(adInfo?.description || "");
    const [price, setPrice] = useState(adInfo?.price || 0);
    const [year, setYear] = useState(adInfo?.year || 0);
    const [category, setCategory] = useState(adInfo?.category || "");
    const [condition, setCondition] = useState(adInfo?.condition || "");
    const [metal, setMetal] = useState(adInfo?.metal || "");
    const [images, setImages] = useState(null);


    if (!adInfo && userData._id !== adInfo?.ownerId) {
        return <Navigate to="/" />
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        console.log(images)
    };


    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            if (title) formData.append("title", title);
            if (description) formData.append("description", description);
            if (price) formData.append("price", price);
            if (year) formData.append("year", year);
            if (category) formData.append("category", category);
            if (condition) formData.append("condition", condition);
            if (metal) formData.append("metal", metal);

            if (images) {
                for (let index = 0; index < images.length; index++) {
                    formData.append("images", images[index])
                    
                }
            }


            const response = await axios.patch(`${backendUrl}/ad/edit/${adId}`, formData, {
                headers: {
                    Authorization: `${token}`
                }
            }); 

            console.log(response.data);

            navigate("/")
            


        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }


    return (
        <>
            <main className='py-3 px-4 md:px-6 md:py-5'>
                <h1 className='text-2xl md:text-3xl mb-3 tracking-wide text-center'>Edit YOUR AD</h1>

                <form className='border border-purple-400 mx-auto w-[90%] md:w-3/4 py-3 rounded-lg' onSubmit={handleEdit}>


                    <div className='px-3 pb-5 border-0 border-b border-slate-400 my-3'>

                        <Input type="text" name="title" label="Ad title *" value={title} onChangeFunction={setTitle} />

                        <Input type="text" name="description" label="Description *" isTextArea={true} value={description} onChangeFunction={setDescription} />

                        <Input type="number" name="price" label="Set a price *" value={price} onChangeFunction={setPrice} />

                        <Input type="number" name="year" label="Year of coin*" value={year} onChangeFunction={setYear} />


                        <div className='d-flex gap-5 md:gap-7 lg:gap-9 flex-wrap'>
                            <div>
                                <label htmlFor="select-category" className='text-purple-700 focus:text-slate-900 my-5'>Select category *</label>
                                <select className='py-1 px-2 block border bg-purple-100 my-2 rounded-md outline-none cursor-pointer' name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="">All Categories</option>
                                    {
                                        categories.map((ele, i) => <option className='bg-white' key={i} value={ele}>{ele}</option>)
                                    }
                                </select>
                            </div>

                            <div>
                                <label htmlFor="select-category" className='text-purple-700 focus:text-slate-900 my-5'>Select condition *</label>

                                <select className='py-1 px-2 block border bg-purple-100 my-2 rounded-md outline-none cursor-pointer' name="category" id="category" value={condition} onChange={e => setCondition(e.target.value)}>
                                    <option value="">All Conditions</option>
                                    {
                                        conditions.map((ele, i) => <option className='bg-white' key={i} value={ele}>{ele}</option>)
                                    }
                                </select>
                            </div>

                            <div>
                                <label htmlFor="select-category" className='text-purple-700 focus:text-slate-900 my-5'>Metal of coin *</label>

                                <select className='py-1 px-2 block border bg-purple-100 my-2 rounded-md outline-none cursor-pointer' name="category" id="category" value={metal} onChange={e => setMetal(e.target.value)}>
                                    <option value="">Metal</option>
                                    {
                                        metals.map((ele, i) => <option className='bg-white' key={i} value={ele}>{ele}</option>)
                                    }
                                </select>
                            </div>
                        </div>


                        <label htmlFor="" className='text-purple-700 focus:text-slate-900 mt-6 mb-2 block'>Upload Photos</label>

                        {/* Upload images Photo */}
                        <div className=''>
                            <div className='d-flex gap-3'>
                                <label className='bg-purple-700 px-4 py-1 text-white rounded-full' htmlFor="profileImg">Upload images of your</label>
                                <input className='hidden' type="file" name="profileImg" id="profileImg" accept="image/*" multiple={true} onChange={e => handleImageChange(e)} max={2} />
                            </div>


                            {/* Showing images */}
                            <div className='w-full flex-wrap mt-3 d-flex gap-3'>

                                {
                                    images ?
                                        images?.map((ele, i) => (
                                            <img className='w-24 h-24 rounded' key={i} src={URL.createObjectURL(ele)} alt="" />
                                        ))
                                        :
                                        adInfo.images.length !== 0 && adInfo.images.map((ele, i) => (
                                            <img className='w-24 h-24 rounded' key={i} src={ele} alt="" />
                                        ))
                                }



                            </div>
                        </div>
                    </div>

                    {
                        loading && <Loader />
                    }

                    {
                        error && <p className='px-3 text-red-500'><span className='font-semibold'>Error:</span>{error}</p>
                    }

                    <button className='m-3 text-white bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-gradient-to-bl focus:outline-none py-2 px-3 rounded-md' type="submit">Post now</button>



                </form>

            </main>
        </>
    )
}

export default EditAd