import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { BoardPage, BoardsPage, HomePage, SignUpPage, SignInPage } from '../../Pages';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './Layout';
import './App.scss';
import { EditProfilePage } from '../../Pages/EditProfilePage/EditProfilePage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
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
