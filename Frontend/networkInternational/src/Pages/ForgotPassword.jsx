import { useState } from 'react';
import axios from 'axios';
import './UserSignup.css'; 
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));

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

  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email is invalid';
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Send reset code clicked");

    const allFields = ['email'];
    const touchedFields = {};
    allFields.forEach(field => {
      touchedFields[field] = true;
    });
    setTouched(touchedFields);

    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/userAuth/forgotPassword`, {
        email: formData.email
      }, {withCredentials: true});
      if(response.status === 200){
               setMessage({ 
        type: 'success', 
        text: 'Password reset Link has been sent to your email!' 
      });
      }

      
      
      setTimeout(() => {
        navigate('/forgotPassword', { state: { email: formData.email } });
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to send reset instructions. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
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
          <h1 className="signup-title">Forgot Password</h1>
          <p className="signup-subtitle">Enter your email to receive password reset Link</p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="email" 
              id="email"
              className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && <span className="error-message">{errors.email}</span>}
          </div>

          <button 
            type="submit" 
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="signup-footer">
          <p>Remember your password? 
            <button className="login-link-button" onClick={handleBackToLogin}>
              Back to Sign In
            </button>
          </p>
          <p className="company-tagline">Made in Guinea – Driving Jobs, Skills, and Industrial Growth</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;