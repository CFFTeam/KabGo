import React from "react";
import styles from "./Category.module.css";
import Finish from "@assets/svg/Dashboard/finish.svg";
import Coordinating from "@assets/svg/Dashboard/coordinating.svg";
import Doing from "@assets/svg/Dashboard/doing.svg";
import Cancel from "@assets/svg/Dashboard/cancel.svg";

const Category: React.FC = () => {
  interface CategoryData {
    number: number;
    name: string;
    img: string;
    color: string;
  }

  const categoryData: CategoryData[] = [
    {
      number: 10,
      name: "Hoàn thành",
      img: Finish,
      color: "#21AA89",
    },
    {
      number: 2,
      name: "Đang tiến hành",
      img: Doing,
      color: "#F93232",
    },
    {
      number: 32,
      name: "Đang điều phối",
      img: Coordinating,
      color: "#EBB100",
    },
    {
      number: 5,
      name: "Đã hủy",
      img: Cancel,
      color: "#868e96",
    },
    
  ];

  return (
    <div className={styles["category-container"]}>
      {/* <BeatLoader color="#F86C1D" margin={2}  size={12} speedMultiplier={0.5} /> */}
      {categoryData.map((data, index) => (
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
      ))}
    </div>
  );
};

export default Category;
