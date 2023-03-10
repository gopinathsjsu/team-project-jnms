import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import styles from "./Dashboard.module.css";

const BASE_URL = "http://localhost:3001";
const DASHBOARD_API = "/dashboard";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${DASHBOARD_API}`);
        setData(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatCharts = () => {
    if (data) {
      return (
        <div>
          <h2>Class Schedules</h2>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="classnum" fill="#30b8a5" />
          </BarChart>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return <div className={styles.container}>{formatCharts()}</div>;
}

export default Dashboard;
