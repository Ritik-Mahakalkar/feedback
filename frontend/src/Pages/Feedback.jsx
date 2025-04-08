import React, { useState } from 'react';
import axios from 'axios';
import './Feedback.css'


const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
      const [errors, setErrors] = useState({});
      const [submitted, setSubmitted] = useState(false);
    
      const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.message.trim() || formData.message.length < 10) {
          newErrors.message = 'Message must be at least 10 characters';
        }
        return newErrors;
      };
    
      const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        try {
          await axios.post('http://localhost:5000/feedback', formData);
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
        } catch (error) {
          alert('Something went wrong while submitting feedback!');
        }
      };
    
      if (submitted) {
        return (
            <div className="thank-you-style">
              Thank you!
            </div>
          );
          
      }
    
      return (
        <form onSubmit={handleSubmit}>
             <h1>Feedback Form</h1><br />
          <div>
            
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name' />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>
    
          <div>
            
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
          </div>
    
          <div>
           
            <textarea name="message" rows="4" value={formData.message} onChange={handleChange} placeholder='Message'/>
            {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
          </div>
    
          <button type="submit">Submit</button>
        </form>
      );
    }
export default Feedback
