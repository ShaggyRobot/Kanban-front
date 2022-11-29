import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';
import { BoardPage, BoardsPage, HomePage, SignUpPage, SignInPage } from '../../Pages';
import Layout from './Layout';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/boards" element={<ProtectedRoute outlet={<BoardsPage />} />} />
          <Route path="/boards/:id" element={<ProtectedRoute outlet={<BoardPage />} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
