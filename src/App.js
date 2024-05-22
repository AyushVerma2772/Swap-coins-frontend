import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Routes, Route, useLocation } from "react-router-dom";
import Post from './pages/Post';
import Item from './pages/Item';
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import EditProfile from './pages/EditProfile';
import EditAd from './pages/EditAd';
import Wishlist from './pages/Wishlist';

const App = () => {
  const { isLogin } = useSelector(store => store.user);

  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") setIsLoginPage(true);
    else setIsLoginPage(false);

  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname])

  return (
    <>

      {!isLoginPage && <Navbar />}

      <Routes>
        <Route path='/signup' element={isLogin ? <Home /> : <Signup />} />
        <Route path='/login' element={isLogin ? <Home /> : <Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<ProtectedRoute><Post /></ProtectedRoute>} />
        <Route path='/item/:adId' element={<ProtectedRoute><Item /></ProtectedRoute>} />
        <Route path='/chats' element={<ProtectedRoute><Chats /></ProtectedRoute>} />
        <Route path='/profile/:userId' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/editprofile/:userId' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        <Route path='/editad/:adId' element={<ProtectedRoute><EditAd /></ProtectedRoute>} />
        <Route path='/wishlist/:userId' element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path='/search/:searchQuery' element={<Search />} />
      </Routes>

    </>
  )
}

export default App