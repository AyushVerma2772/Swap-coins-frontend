import React from 'react';

const FlippingCoin = () => {
    return (
        <div className="loader d-flex justify-center">
            <div className="w-[85%] h-[85%] rounded-full border-2 border-yellow-800">
                <p className='text-center text-yellow-800 text-lg'>₹</p>
            </div>
        </div>
    )
}

const Loader = () => {
    return (
        <>
            <div className="d-flex justify-center gap-3">
                <FlippingCoin />
                <FlippingCoin />
                <FlippingCoin />
            </div>
        </>
    )
}

export default Loader