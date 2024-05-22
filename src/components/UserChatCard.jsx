import React from 'react'

const UserChatCard = ({ handleChatClick }) => {
    return (
        <>
            <div className="d-flex w-full py-1.5 px-1.5 hover:bg-slate-400/20 border-0 border-b border-b-slate-600 gap-3 cursor-pointer" onClick={handleChatClick} >
                <img className='w-10 h-10 rounded-full' src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg" alt="" />

                <div className="flex flex-col w-full" >
                    <h3 className='dot-text font-semibold tracking-wide'>Ayush Verma</h3>
                    <p className='text-sm font-light dot-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, a.</p>
                </div>
            </div>

        </>
    )
}

export default UserChatCard