import React from "react";
import styles from "./dashboard.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import BeatLoader from "react-spinners/BeatLoader";
import toast, { Toaster } from "react-hot-toast";

const Category: React.FC = () => {
  const categoryData = useAppSelector((state) => state.dashboard.categoryData);
  const isDoneCategoryData = useAppSelector(
    (state) => state.dashboard.isDoneCategoryData
  );

  return (
    <div className={styles["category-container"]}>
      {!isDoneCategoryData ? (
        <BeatLoader
          color="#F86C1D"
          margin={2}
          size={12}
          speedMultiplier={0.5}
        />
      ) : (
        categoryData.map((data, index) => (
          <div
            className={styles["category"]}
            key={index}
            style={{ backgroundColor: data.color }}
          >
            <div className={styles["category-info"]}>
              <div className={styles["category-number"]}>{data.number}</div>
              <div className={styles["category-name"]}>{data.name}</div>
            </div>
            <div className={styles["category-img"]}>
              <img src={data.img}></img>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Category;
