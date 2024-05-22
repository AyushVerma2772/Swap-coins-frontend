import React, { useState } from 'react'
import UserChatCard from '../components/UserChatCard';
import { FcAddImage } from "react-icons/fc";
import UserMessage from '../components/UserMessage';
import { IoIosArrowBack } from "react-icons/io";


const Chats = () => {
    const [openChat, setOpenChat] = useState(false);

    const openUserChat = (event) => {
        const h3Element = event.currentTarget.querySelector('h3');
        console.log(h3Element);
        setOpenChat(true);
    };

    const closeUserChat = () => {
        setOpenChat(false);
    }

    return (
        <>
            <main className="py-3 px-4 md:px-6 md:py-5 ">

                <div className="bg-white d-flex border border-slate-400 rounded-sm relative overflow-hidden">

                    {/* All user chats */}
                    <div className="users-chats w-full md:w-[40%] h-[80vh] max-h-[80vh] border-0 border-r border-slate-400 flex flex-col">
                        <div className="p-2 bg-slate-400/20 d-flex justify-between border-0 border-b border-b-slate-600 h-12">
                            <h2 className='text-xl font-medium'>Your chats</h2>

                            <input className='text-base px-1 py-0.5 outline-none bg-transparent border-0 border-b border-b-slate-600 placeholder:text-slate-600 w-2/5' placeholder='Search User' type="search" name="search-user-chat" id="search-user-chat" />
                        </div>


                        <div className="user-chats-container overflow-auto scrollbar-hide flex-grow">
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                            <UserChatCard handleChatClick={openUserChat} />
                        </div>
                    </div>

                    {/* User message area  */}
                    <div className={`bg-white flex flex-col justify-between user-messages w-full md:w-[60%] h-[80vh] max-h-[80vh] md:static absolute top-0 transition-all duration-300 ${openChat ? 'left-0' : '-left-full'}`}>
                        <div className="p-2 bg-slate-600/20 border-0 border-b border-b-slate-600 h-12 d-flex gap-2">
                            <button className='block text-xl' onClick={closeUserChat}><IoIosArrowBack /></button>
                            <h2 className='text-xl font-medium text-left'>User Name</h2>
                        </div>

                        <div className="chat-area flex-grow overflow-auto scrollbar-hide py-1 px-1.5">
                            <UserMessage imgUrl={"https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"} />
                            <UserMessage />
                            <UserMessage imgUrl={"https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"} isOwner={true} />
                            <UserMessage />
                            <UserMessage isOwner={true} />
                            <UserMessage />
                            <UserMessage imgUrl={"https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"} isOwner={true} />
                            <UserMessage />
                            <UserMessage imgUrl={"https://images.unsplash.com/photo-1444525873963-75d329ef9e1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"} isOwner={true} />
                        </div>

                        <form className="w-full border border-slate-600 border-b-0 d-flex justify-between">
                            <textarea placeholder='Type here' className='p-1 w-[80%] outline-none border-0 border-b border-b-slate-600 resize-none scrollbar-hide' name="" id="" rows="2"></textarea>

                            <div className="d-flex justify-evenly gap-3 w-[20%]">
                                <label htmlFor="file-img">
                                    <FcAddImage className='text-2xl md:text-3xl' />
                                </label>
                                <input type="file" name="file-img" id="file-img" className='hidden' />

                                <button className='text-slate-50 rounded bg-slate-900 px-2.5 py-1'>
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

            </main>

        </>
    )
}

export default Chats