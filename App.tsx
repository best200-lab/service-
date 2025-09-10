import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import SignupPage from './pages/SignupPage'; // Import the new SignupPage

import Dashboard from './pages/Dashboard';
import ServeDocument from './pages/ServeDocument';
import Directory from './pages/Directory';
import Messages from './pages/Messages';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> {/* Add the signup route */}
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>

        {/* Private App Routes */}
        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/serve" element={<ServeDocument />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        {/* Redirect legacy root hash to the new dashboard path */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;