import React, { useState } from 'react';
import './BuyTicket.css';

const BuyTicket = () => {
  const [name, setName] = useState('');
  const [cardSuffix, setCardSuffix] = useState('');
  const [cvv, setCvv] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || cardSuffix.length < 9 || !cvv || !month || !year) {
      alert('Please fill all fields correctly.');
      return;
    }
    const fullCard = `6280 7030 ${cardSuffix}`;
    console.log('Form Submitted:', { name, fullCard, cvv, month, year });
    
    // Success confirmation
    alert('✅ Payment completed successfully! Your ticket has been sent to your email.');
  
    // Optional: reset form
    setName('');
    setCardSuffix('');
    setCvv('');
    setMonth('');
    setYear('');
  };
  

  return (
    <div className="buy-ticket-page">
      <div className="buy-ticket-container">
        <h2>Buy Your Ticket</h2>
        <form className="buy-ticket-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="card-input-wrapper">
            <span className="card-prefix">6280 7030</span>
            <input
              type="text"
              placeholder="XXXX XXXX"
              value={cardSuffix}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
                const formatted = raw.replace(/(\d{4})(\d{0,4})/, (_, p1, p2) =>
                  p2 ? `${p1} ${p2}` : p1
                );
                setCardSuffix(formatted);
              }}
              required
            />
          </div>

          <input
            type="text"
            placeholder="CVV (3 digits)"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
            required
          />

          <div className="expiry-selects">
            <select value={month} onChange={(e) => setMonth(e.target.value)} required>
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => {
                const m = i + 1;
                return (
                  <option key={m} value={m < 10 ? `0${m}` : m}>
                    {m < 10 ? `0${m}` : m}
                  </option>
                );
              })}
            </select>

            <select value={year} onChange={(e) => setYear(e.target.value)} required>
              <option value="">Year</option>
              {Array.from({ length: 10 }, (_, i) => {
                const y = new Date().getFullYear() + i;
                return <option key={y} value={y}>{y}</option>;
              })}
            </select>
          </div>

          <button type="submit">Confirm Purchase</button>
        </form>
      </div>
    </div>
  );
};

export default BuyTicket;
