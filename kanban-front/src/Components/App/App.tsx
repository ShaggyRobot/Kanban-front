import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardsPage from '../../Pages/BoardsPage/BoardsPage';
import HomePage from '../../Pages/HomePage/HomePage';
import { SignIn } from '../SignIn/SignIn';
import { SignUp } from '../SignUp/SignUp';
import './App.scss';
import Layout from './Layout';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/boards" element={<ProtectedRoute outlet={<BoardsPage />} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
