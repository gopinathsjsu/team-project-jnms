import React, { useState } from "react";
import axios from "axios";
import styles from "./Enroll.module.css";

const BASE_URL = "http://localhost:3001";
const ENROLL_API = "/enroll";

function Enroll() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}${ENROLL_API}`, {
        email,
        password,
        city,
      });
      console.log(response.data);
      alert("New User Added!!");
      setEmail("");
      setPassword("");
      setCity("");
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <h2>Enroll</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" value={city} onChange={handleCityChange} required />
        </div>
        <button type="submit" className={styles.button}>
          Enroll
        </button>
      </form>
    </div>
    </div>
  );
}

export default Enroll;
