import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { BoardPage, BoardsPage, HomePage, SignUpPage, SignInPage } from '../../Pages';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './Layout';
import './App.scss';
import { EditProfilePage } from '../../Pages/EditProfilePage/EditProfilePage';
import { Index } from '../../Pages/Index/Index';

function App() {
  const { pathname } = useLocation();
  return (
    <div className={pathname === '/home' ? 'app-home' : 'app'}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/editprofile" element={<ProtectedRoute outlet={<EditProfilePage />} />} />
          <Route path="/boards" element={<ProtectedRoute outlet={<BoardsPage />} />} />
          <Route path="/boards/:id" element={<ProtectedRoute outlet={<BoardPage />} />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={3000} pauseOnHover />
    </div>
  );
}

export default App;
