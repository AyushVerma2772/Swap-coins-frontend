import React, { useEffect, useState } from 'react';
import "react-country-state-city/dist/react-country-state-city.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardContainer from '../components/CardContainer';
import Loader from '../components/Loader';
import { backendUrl, categories, conditions } from '../utils/data';

const Search = () => {
    const { searchQuery } = useParams();
    const [adsData, setAdsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // console.log(adsData)
    // console.log(maxPrice)

    const getSearchResults = async () => {
        setIsLoading(true);
        let searchUrl = `${backendUrl}/ads/search?q=${searchQuery}`;

        if (category) searchUrl += `&category=${category}`;
        if (condition) searchUrl += `&condition=${condition}`;
        if (minPrice && !isNaN(minPrice)) searchUrl += `&minprice=${minPrice}`;
        if (maxPrice && !isNaN(maxPrice)) searchUrl += `&maxprice=${maxPrice}`

        console.log(searchUrl);

        try {
            const response = await axios.get(searchUrl);
            console.log(response.data);
            if (response.data.success) {
                setAdsData(response.data)
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }


    const handleFilters = (e) => {
        e.preventDefault();

        if (e.target[0].value) setCategory(e.target[0].value);
        if (e.target[1].value) setCondition(e.target[1].value);
        if (e.target[2].value && !isNaN(e.target[2].value)) setMinPrice(e.target[2].value);
        if (e.target[3].value && !isNaN(e.target[3].value)) setMaxPrice(e.target[3].value);

        getSearchResults();
    }



    useEffect(() => {

        getSearchResults();
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <header className='my-1.5 px-5 flex justify-center items-start flex-col gap-2 border-0 border-b py-1 md:py-1.5 border-purple-800'>

                <h2 className='text-base md:text-lg font-medium'><span className="font-semibold">Search results for: </span>{`${searchQuery}`}</h2>

                <form className='w-full flex flex-wrap gap-3 md:gap-5' onSubmit={handleFilters}>
                    <select className='py-1 px-2 block border bg-purple-100 rounded-md cursor-pointer outline-none h-max' name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {
                            categories.map((ele, i) => <option className='bg-white' key={i} value={ele}>{ele}</option>)
                        }

                    </select>

                    <select className='py-1 px-2 block border bg-purple-100 rounded-md cursor-pointer outline-none h-max' name="category" id="category" value={condition} onChange={e => setCondition(e.target.value)}>
                        <option value="">Conditions</option>
                        {
                            conditions.map((ele, i) => <option className='bg-white' key={i} value={ele}>{ele}</option>)
                        }

                    </select>

                    <input className='w-[40%] md:w-auto outline-none border border-purple-400 rounded p-1 h-max' type="text" name="min-price" id="min-price" placeholder='Min price' value={minPrice} onChange={e => setMinPrice(e.target.value)} />

                    <input className='w-[40%] md:w-auto outline-none border border-purple-400 rounded p-1  h-max' type="text" name="max-price" id="max-price" placeholder='Max price' value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />

                    <button className='text-white bg-gradient-to-br from-purple-700 to-purple-500 hover:bg-gradient-to-bl focus:outline-none py-1 px-3 rounded-md' type="submit">Apply</button>

                </form>

            </header>
            <main className="py-3 px-4 md:px-6 md:py-5">
                {
                    !adsData && isLoading ? <Loader /> :

                        <>

                            <h3 className='text-base md:text-lg mb-3 tracking-wide'>Total Results: {adsData?.totalResults}</h3>

                            <CardContainer ads={adsData?.ads || []} />

                        </>
                }
            </main>


            
        </>
    )
}

export default Search