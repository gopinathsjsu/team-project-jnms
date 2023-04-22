import React, { useState } from 'react';
import axios from 'axios';
import styles from './CancelFreeTrial.module.css';

const BASE_URL = 'http://localhost:3001';
const CANCEL_FREE_TRIAL_API = '/cancel-free-trial';

const CancelFreeTrial = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleCancel = async () => {
    try {
      const response = await axios.post(`${BASE_URL}${CANCEL_FREE_TRIAL_API}`, { email });
      alert(response.data.message);
      setEmail('');
      setError(null);
    } catch (error) {
      console.error(error);
      setError('There was an error cancelling your free trial.');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(null); // Clear the error when the email is changed
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <h2>Cancel Free Trial</h2>
      <p>Enter a email address to cancel the free trial:</p>
      <input
        className={styles.input}
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email Address" required
      />
      {error && <div className={styles.error}>{error}</div>}
      <button className={styles.button} onClick={handleCancel}>
        Cancel Free Trial
      </button>
    </div>
    </div>
  );
};

export default CancelFreeTrial;
