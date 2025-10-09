import React, { useState } from 'react';
import axios from 'axios';
import './UserSignup.css'; // Using the same CSS file
import { useNavigate } from 'react-router';

const UserSignin = () => {
  const [formData, setFormData] = useState({
    license: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched(prev => ({
      ...prev,
      [id]: true
    }));
    validateField(id, formData[id]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'license':
        if (!value.trim()) {
          error = 'License number is required';
        }
        break;
      
      case 'password':
        if (!value) {
          error = 'Password is required';
        }
        break;
      
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return !error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check required fields
    const requiredFields = ['license', 'password'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field === 'license' ? 'License number' : 'Password'} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login clicked");

    // Mark all fields as touched
    const allFields = ['license', 'password'];
    const touchedFields = {};
    allFields.forEach(field => {
      touchedFields[field] = true;
    });
    setTouched(touchedFields);

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

     try {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/userAuth/userSignin`, formData, {withCredentials: true})
        navigate('/home')
     } catch (error) {
        
     }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <div className="company-logo">
            <div className="logo-text">
              <span className="logo-primary">NETWORK</span>
              <span className="logo-secondary">INTERNATIONAL</span>
              <span className="logo-tertiary">GENERAL TRADING</span>
            </div>
          </div>
          <h1 className="signup-title">Welcome Back</h1>
          <p className="signup-subtitle">Sign in to your NIGT account</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="license" className="form-label">License Number</label>
            <input 
              type="text" 
              id="license"
              className={`form-input ${errors.license && touched.license ? 'error' : ''}`}
              placeholder="Enter your license number"
              value={formData.license}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.license && touched.license && <span className="error-message">{errors.license}</span>}
          </div>

          <div className="form-group password-group">
            <label htmlFor="password" className="form-label">Password </label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"}
                id="password"
                className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && touched.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="signup-button">
            Sign In
          </button>
        </form>

        <div className="signup-footer">
          <p>Don't have an account? <a href="/signup" className="login-link">Create Account</a></p>
          <p className="company-tagline">Made in Guinea – Driving Jobs, Skills, and Industrial Growth</p>
        </div>
      </div>
    </div>
  );
};

export default UserSignin;