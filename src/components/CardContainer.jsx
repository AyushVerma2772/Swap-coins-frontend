import React from 'react'
import Card from './Card'

const CardContainer = ({ ads, setIsChanged }) => {
    return (
        <>
            <section className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-5 md:gap-7 lg:gap-9'>
                {
                    ads.map((ele, i) => (

                        <Card setIsChanged={setIsChanged} key={ele._id} adInfo={ele} />

                    ))
                }
            </section>
        </>
    )
}

export default CardContainer