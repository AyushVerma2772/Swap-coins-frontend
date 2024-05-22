import React, { useState } from 'react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DisplayImageContainer from './DisplayImageContainer';

// import required modules


const ImageSlider = ({ images }) => {
    const [open, setOpen] = useState(false);
    const [currImg, setCurrImg] = useState("");

    const openDisplayImageContainer = (imgUrl) => {
        setCurrImg(imgUrl);
        setOpen(true);
        console.log(currImg, open)
    }



    return (
        <>
            <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{ clickable: true, }} navigation={true} modules={[Navigation, Pagination, Mousewheel, Keyboard]} className="mySwiper" mousewheel={true} keyboard={true}>
                {
                    images.map((ele, i) => {
                        return <SwiperSlide key={i}>
                            <figure className="md:h-[90vh] h-[60vh] bg-black" >
                                <img className='cursor-zoom-in' src={ele} alt="slide-img" onClick={() => openDisplayImageContainer(ele)} />
                            </figure>
                        </SwiperSlide>
                    })
                }

            </Swiper>

            {open && <DisplayImageContainer currImg={currImg} setOpen={setOpen} />}


        </>
    )
}

export default ImageSlider