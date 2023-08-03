import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from 'react-hot-toast';

const Category: React.FC = () => {
  const categoryData = useAppSelector((state) => state.dashboard.categoryData);
    
  // const notify = () => {
  //   toast.success('Tạo tài khoản thành công', {
  //     style: {
  //       border: '2px solid #28a745',
  //       padding: '10px',
  //     },
  //   });
  //   toast.error('Tạo tài khoản thất bại', {
  //     style: {
  //       border: '2px solid #dc3545',
  //       padding: '10px',
  //     },
  //   });
  // };
  return (
    <div className={styles["category-container"]}>
      {/* <BeatLoader color="#F86C1D" margin={2}  size={12} speedMultiplier={0.5} /> */}
      {categoryData.map((data, index) => (
        <div className={styles["category"]} key={index} style={{ backgroundColor: data.color }}>
          <div className={styles["category-info"]}>
            <div className={styles["category-number"]}>{data.number}</div>
            <div className={styles["category-name"]}>{data.name}</div>
          </div>
          <div className={styles["category-img"]}>
            <img src={data.img}></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
