import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Calendar, Lock, User, CheckCircle, AlertCircle } from 'lucide-react';
import './BuyTicket.css';

const BuyTicket = () => {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    cvv: '',
    month: '',
    year: ''
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Valid card number is required';
    }
    if (!formData.cvv || formData.cvv.length !== 3) newErrors.cvv = 'Valid CVV is required';
    if (!formData.month) newErrors.month = 'Month is required';
    if (!formData.year) newErrors.year = 'Year is required';
    return newErrors;
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/.{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 3);
    } else if (name === 'month') {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 2);
      if (parseInt(formattedValue) > 12) formattedValue = '12';
    } else if (name === 'year') {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 2);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          cardNumber: '',
          cvv: '',
          month: '',
          year: ''
        });
        setShowSuccess(false);
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
      setIsSubmitting(false);
    }
  };
  

  return (
    <motion.div 
      className="buy-ticket-page"
      key="buy-ticket-page-refreshed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="payment-container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '48px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '38px 24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        maxWidth: '900px',
        width: '100%',
        margin: '20px auto'
      }}>
        {/* Optionally, add a purchase summary here for future enhancement */}
        <motion.div 
          className={`card-wrapper ${isFlipped ? 'is-flipped' : ''}`}
          style={{
            perspective: '1200px',
            width: '340px',
            height: '210px',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 2
          }}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-preview front" style={{
            width: '100%',
            height: '100%',
            borderRadius: '18px',
            background: 'linear-gradient(120deg, #232526 0%, #414345 100%)',
            color: '#fff',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.18)',
            padding: '28px 24px 18px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 0,
            left: 0,
            backfaceVisibility: 'hidden',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
            zIndex: 2
          }}>
            <div className="card-type" style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '10px',
              color: '#e0ff64',
              fontWeight: 500
            }}>CREDIT CARD</div>
            <div className="card-number" style={{
              fontSize: '1.4rem',
              letterSpacing: '2px',
              marginBottom: '20px',
              fontFamily: 'monospace'
            }}>{formData.cardNumber || '•••• •••• •••• ••••'}</div>
            <div className="card-info" style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.9rem',
              textTransform: 'uppercase'
            }}>
              <div className="card-name" style={{
                fontWeight: 500,
                letterSpacing: '1px'
              }}>{formData.name || 'CARD HOLDER'}</div>
              <div className="card-expiry" style={{
                fontFamily: 'monospace'
              }}>
                {formData.month || 'MM'}/{formData.year || 'YY'}
              </div>
            </div>
          </div>
          <div className="card-preview back">
            <div className="card-stripe" />
            <div className="card-cvv">{formData.cvv ? '•'.repeat(3) : 'CVV'}</div>
          </div>
        </motion.div>

        <form 
          className="payment-form" 
          onSubmit={handleSubmit} 
          autoComplete="off" 
          aria-label="Buy Ticket Payment Form"
          style={{
            flex: 1,
            minWidth: '300px',
            maxWidth: '500px'
          }}
        >
          <h2 style={{
            marginBottom: '24px',
            color: '#e0ff64',
            fontSize: '1.8rem',
            textAlign: 'center'
          }}>Payment Details</h2>
          
          <div className="form-group">
            <label>
              <User size={16} />
              Card Holder Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'error input-error' : ''}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              autoFocus
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>
              <CreditCard size={16} />
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className={errors.cardNumber ? 'error input-error' : ''}
              aria-invalid={!!errors.cardNumber}
              aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
              maxLength="19"
              inputMode="numeric"
            />
            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <Calendar size={16} />
                Expiry Date
              </label>
              <div className="expiry-inputs">
                <input
                  type="text"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  placeholder="MM"
                  maxLength="2"
                  className={errors.month ? 'error input-error' : ''}
                  aria-invalid={!!errors.month}
                  aria-describedby={errors.month ? 'month-error' : undefined}
                  inputMode="numeric"
                />
                <span>/</span>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="YY"
                  maxLength="2"
                  className={errors.year ? 'error input-error' : ''}
                  aria-invalid={!!errors.year}
                  aria-describedby={errors.year ? 'year-error' : undefined}
                  inputMode="numeric"
                />
              </div>
              {(errors.month || errors.year) && (
                <span className="error-message">{errors.month || errors.year}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                <Lock size={16} />
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                placeholder="123"
                maxLength="3"
                className={errors.cvv ? 'error input-error' : ''}
                aria-invalid={!!errors.cvv}
                aria-describedby={errors.cvv ? 'cvv-error' : undefined}
                inputMode="numeric"
                autoComplete="off"
              />
              {errors.cvv && <span className="error-message">{errors.cvv}</span>}
            </div>
          </div>

          <AnimatePresence>
            {errors.submit && (
              <motion.div
                className="error-banner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <AlertCircle size={18} />
                {errors.submit}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            aria-label={isSubmitting ? 'Processing payment' : 'Complete Payment'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(90deg, #e0ff64 0%, #64ff87 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#1a1a1a',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '10px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(224, 255, 100, 0.15)'
            }}
          >
            {isSubmitting ? (
              <div className="spinner" />
            ) : showSuccess ? (
              <>
                <CheckCircle size={18} />
                Payment Successful
              </>
            ) : (
              'Complete Payment'
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default BuyTicket;
