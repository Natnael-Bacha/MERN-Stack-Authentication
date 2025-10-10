import { useState } from 'react';
import axios from 'axios';
import './userAuth.css'; 
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
  const [apiError, setApiError] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));

    // Clear field errors when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
    
    // Clear API error when user makes any change
    if (apiError) {
      setApiError('');
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

    // Clear previous API errors
    setApiError('');

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

    setIsSubmitting(true);

    try {
      console.log(formData);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/userAuth/userSignin`, formData, { 
        withCredentials: true 
      });
      
      if (response.status === 200) {
        console.log("Logged in");
        navigate('/home');
      }  
      
    } catch (error) {
      console.log("Error while logging in: ", error);
      
      
      if (error.response?.status === 429) {
        setApiError(error.response.data?.message || "Too many login attempts. Please wait a few minutes before trying again.");
      } 
      // Handle other API errors
      else if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } 
      // Handle network errors
      else if (error.request) {
        setApiError("Network error. Please check your connection and try again.");
      } 
      // Handle other errors
      else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleForgotPassword() {
    navigate('/forgotPassword');
  }

  function handleToSignup() {
    navigate('/userSignup');
  }

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

        {/* API Error Message */}
        {apiError && (
          <div className="api-error-message">
            <div className="error-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <span>{apiError}</span>
          </div>
        )}

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
            <div className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</div>
          </div>

          <button 
            type="submit" 
            className={`signup-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="button-spinner"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="signup-footer">
          <p>Don't have an account? <span className="login-link" onClick={handleToSignup}>Create Account</span> </p>
          <p className="company-tagline">Made in Guinea – Driving Jobs, Skills, and Industrial Growth</p>
        </div>
      </div>
    </div>
  );
};

export default UserSignin;