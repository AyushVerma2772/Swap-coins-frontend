import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader"
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';
import { backendUrl } from '../utils/data';

const Home = () => {
  console.log("Rerender")
  const [adsData, setAdsData] = useState({ ads: [] });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const getAdsData = async () => {
    setIsLoading(true);
    try {

      const response = await axios.get(`${backendUrl}/ads?page=${page}`);
      // console.log(response)
      const { ads, totalResults, hasMore, } = response.data;
      setAdsData(prev => ({ totalResults, hasMore, ads: [...prev?.ads, ...ads] }));
      // setAds(prev => [...prev, ...response.data.ads]);
      console.log("Naya Data", response.data)
    }
    catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setPage(prev => prev + 1)

    // console.log(page) 
  }


  useEffect(() => {
    getAdsData();
    // eslint-disable-next-line
  }, [isChanged]);


  return (
    <>
      <main className='py-3 px-4 md:px-6 md:py-5'>

        <h1 className='text-xl text-purple-800 md:text-2xl mb-3 tracking-wide'>Fresh Recommendations</h1>

        {
          isLoading && !adsData && !adsData.ads.length ? <Loader />
            :
            <InfiniteScroll
              dataLength={adsData.ads.length}
              next={getAdsData}
              hasMore={adsData?.hasMore}
              loader={<div className='my-2'><Loader /></div>}
              className='scrollbar-hide'
            >


              <section className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-5 md:gap-7 lg:gap-9'>

                {
                  adsData.ads.map((ele, i) => (

                    <Card key={ele._id} adInfo={ele} setIsChanged={setIsChanged} />

                  ))
                }
              </section>


            </InfiniteScroll>


        }

      </main >





    </>
  )
}

export default Home


