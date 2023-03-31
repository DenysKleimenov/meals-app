import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActivationStatus } from './components/ActivationStatus';
import { AuthForm } from './components/AuthForm';
import { Greeting } from './components/Greeting';
import { ProtectedRoute } from './components/ProtectedRoute';
import './index.css';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<ProtectedRoute component={<Greeting />} />} />
    <Route path="authentication" element={<AuthForm />} />
    <Route path="activation/:activationToken" element={<ActivationStatus />} />
  </Routes>
);
