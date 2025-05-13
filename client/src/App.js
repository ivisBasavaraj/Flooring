import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { setAuthToken } from './utils/setAuthToken';
import { loadUser } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';

// Layout Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AlertComponent from './components/common/Alert';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import PlannerPage from './pages/PlannerPage';
import NotFoundPage from './pages/NotFoundPage';

// Planner Demo Component
import PlannerDemo from './components/planner/PlannerDemo';

// Private Route
import PrivateRoute from './components/auth/PrivateRoute';

// Check for token on app load
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <AlertComponent />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <PrivateRoute>
                <ProjectsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/projects/:id" 
            element={
              <PrivateRoute>
                <ProjectDetailPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/planner/new" 
            element={
              <PrivateRoute>
                <PlannerPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/planner/:id" 
            element={
              <PrivateRoute>
                <PlannerPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/planner-demo" 
            element={
              <PrivateRoute>
                <PlannerDemo />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 