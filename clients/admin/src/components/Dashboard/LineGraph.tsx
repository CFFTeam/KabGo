import React from "react";
import styles from "./dashboard.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "Montserrat";

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const data = {
  labels,
  datasets: [
    {
      data: [1000000, 4000000, 1000000, 11000000, 6000000, 8000000, 1000000],
      borderColor: "#F86C1D",
      backgroundColor: "#FFFFFF",
      pointBackgroundColor: "#F86C1D",
      borderWidth: 2,
      pointRadius: 2,   
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  scales: {
    y: {
      suggestedMin: 0,
      suggestedMax: 15000000,
      ticks: {
        stepSize: 3000000,
      },
    },
  },
};

const LineGraph: React.FC = () => {
  return <Line data={data} options={options} />;
};

export default LineGraph;
