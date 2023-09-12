import React from "react";
import styles from "./dashboard.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
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

const LineGraph: React.FC = () => {
  const chartData = useAppSelector((state) => state.dashboard.chartData);
  const labels: string[] = chartData.xLabels;
  const yLabels: number[] = chartData.yLabels;
  const stepRevenue: number = Math.max(...chartData.yLabels) / 4;
  const maxRevenue: number = Math.min(1500000, Math.max(...chartData.yLabels) + stepRevenue); 
  const data = {
    labels,
    datasets: [
      {
        data: yLabels,
        borderColor: "#F86C1D",
        backgroundColor: "#FFFFFF",
        pointBackgroundColor: "#F86C1D",
        borderWidth: 2,
        pointRadius: 2,
      },
    ],
  };
  const options = {
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
        suggestedMax: maxRevenue,
        ticks: {
          stepSize: stepRevenue,
        },
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default LineGraph;
