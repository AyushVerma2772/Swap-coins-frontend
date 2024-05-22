import React from 'react'

const UserMessage = ({ isOwner, imgUrl }) => {
    return (
        <>
            <div className={`w-full d-flex ${isOwner ? 'justify-end' : 'justify-start'} my-2.5`}>
                <div className={`p-1 md:p-1.5 max-w-[60%] rounded-lg ${isOwner ? "bg-[#ceddff] rounded-bl-none" : "bg-slate-400/30 rounded-br-none"}`}>
                    {
                        imgUrl && <img className='w-full mb-3' src={imgUrl} alt="chat-img" />
                    }
                    <p className='text-slate-950'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quod quo nisi
                    </p>

                    <p className='text-xs text-right'>11:50</p>
                </div>
            </div>

        </>
    )
}

export default UserMessage