import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";
import { ReactComponent as Info } from "../../assets/svg/Dashboard/info.svg";

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
// import { Line } from "react-chartjs-2";
// import  faker from "faker";  

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const ChartComponent: React.FC = () => {
  //   const categoryData = useAppSelector((state) => state.dashboard.categoryData);

  return (
    <div className={styles["chart-container"]}>
      <div className={styles["chart-title"]}>
        <div className={`${styles["el-title"]} ${styles["under-el-title"]}`}>
          Doanh thu
        </div>
        <div className={styles["el-title"]}>Time line</div>
        <div className={styles["el-title"]}>Giờ làm</div>
      </div>
      <div className={styles["chart-content"]}>
        <div className={styles["total-revenue"]}>
          <div className={styles["title-info"]}>
            <div className={styles["title"]}>TỔNG DOANH THU HÀNG THÁNG</div>
            <Info />
          </div>
          <div className={styles["revenue"]}>30.453.000</div>
          <div className={styles["currency"]}>VNĐ</div>
        </div>
        <div className={styles["chart-revenue"]}>
          {/* <Line options={options} data={data} />; */}
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
