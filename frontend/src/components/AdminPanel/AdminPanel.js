import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import styles from "./AdminPanel.module.css";

const BASE_URL = "http://localhost:3001";
const DASHBOARD_API = "/admin-panel";

function AdminPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${BASE_URL}${DASHBOARD_API}`);
        const response = await axios.get(`${BASE_URL}${DASHBOARD_API}`);
        setData(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterDataByCurrentDate = () => {
    if (data) {
      const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
      const filteredData = data.filter((item) => item.date === currentDate);
      return filteredData;
    }
    return [];
  };

  const filterDataByFutureDates = () => {
    if (data) {
      const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
      const filteredData = data.filter((item) => item.date > currentDate);
      const sortedData = filteredData.sort((a, b) => a.date.localeCompare(b.date)); // Sort by date in ascending order
      return sortedData;
    }
    return [];
  };

  const formatCharts = () => {
    const currentDayData = filterDataByCurrentDate();
    const futureDatesData = filterDataByFutureDates();
    if (currentDayData.length > 0) {
      return (
      
      <div className={styles.container}>
        <div className={styles.graph}>
          <h2>Current Day</h2>
          
          <BarChart width={500} height={300} data={currentDayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="classnum" fill="#E9A95E" />
          </BarChart>
        </div>
        <div className={styles.graph}>
            <h2>Future Dates Classes</h2>
            <BarChart width={500} height={300} data={futureDatesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="classnum" fill="#EEBF2F" />
            </BarChart>
          </div>
        
      </div>
      
      );
    } else {
      return <div>No data available for the current date....</div>;
    }
  };

  return <div className={styles.container}>
    
    {formatCharts()}</div>;
}

export default AdminPanel;
