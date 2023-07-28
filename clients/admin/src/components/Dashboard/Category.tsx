import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { useAppDispatch, useAppSelector} from "../../hooks/ReduxHooks"

const Category: React.FC = () => {
  const categoryData = useAppSelector((state) => state.dashboard.categoryData)
  return (
    <div className={styles["category-container"]}>
      {categoryData.map((data, index) => (
        <div className={styles["category"]} key={index} style={{backgroundColor: data.color}}>
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
