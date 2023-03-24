import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import styles from "./Activities.module.css";

const BASE_URL = "http://localhost:3001";
const ACTIVITIES_API = "/activities";

function Activities() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("email");
      if (email) {
        const json = {
          email: email,
        };

        const response = await axios.post(`${BASE_URL}${ACTIVITIES_API}`, json);
        setData(response.data);
      }
    };
    fetchData();
  }, []);

  const formatCharts = () => {
    const charts = [];
    if (data) {
      const weekActivities = [
        { name: "Threadmill", value: data.threadmillWeek, color: "#008080" },
        { name: "Cycling", value: data.cyclingWeek, color: "#FF6347" },
        { name: "Stair Mach", value: data.stairMachinesWeek, color: "#228B22" },
        { name: "Weight Training", value: data.weightTrainingWeek, color: "#8B008B" },
      ];

      const monthActivities = [
        { name: "Threadmill", value: data.threadmillMonth, color: "#008080" },
        { name: "Cycling", value: data.cyclingMonth, color: "#FF6347" },
        { name: "Stair Mach", value: data.stairMachinesMonth, color: "#228B22" },
        { name: "Weight Training", value: data.weightTrainingMonth, color: "#8B008B" },
      ];

      const ninetyDaysActivities = [
        { name: "Threadmill", value: data.threadmillNinetyDays, color: "#008080" },
        { name: "Cycling", value: data.cyclingNinetyDays, color: "#FF6347" },
        { name: "Stair Mach", value: data.stairMachinesNinetyDays, color: "#228B22" },
        { name: "Weight Training", value: data.weightTrainingNinetyDays, color: "#8B008B" },
      ];

      charts.push(
        <div key="week" className={styles.chartsContainer}>
          <h2>Last Week</h2>
          <CustomBarChart activities={weekActivities} />
        </div>
      );

      charts.push(
        <div key="month" className={styles.chartsContainer}>
          <h2>Last Month</h2>
          <CustomBarChart activities={monthActivities} />
        </div>
      );

      charts.push(
        <div key="90days" className={styles.chartsContainer}>
          <h2>Last 90 Days</h2>
          <CustomBarChart activities={ninetyDaysActivities} />
        </div>
      );
    }
    return charts;
  };

  // return <div className={styles.container}>{formatCharts()}</div>;
    return (
      <div className={styles.pagecontainer}>
       
       <div>{formatCharts()}</div>
       </div>
       
       );
     
    
}

function CustomBarChart(props) {
  const activities = props.activities;

  return (
    
    <div className={styles.container}>
      <BarChart width={500} height={300} data={activities}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Bar dataKey="value" fill="#30b8a5" />
      </BarChart>
    </div>
    
  );
}



export default Activities;













