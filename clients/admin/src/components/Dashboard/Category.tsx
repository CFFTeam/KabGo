import React from "react";
import styles from "../../assets/css/dashboard.module.css";
import { ReactComponent as User } from "../../assets/svg/Dashboard/user.svg";
import { ReactComponent as Driver } from "../../assets/svg/Dashboard/driver.svg";
import { ReactComponent as Trip } from "../../assets/svg/Dashboard/trip.svg";
import { ReactComponent as CanceledTrip } from "../../assets/svg/Dashboard/canceledtrip.svg";

interface CategoryData {
    number: number;
    name: string;
    img: string;
};

const Category: React.FC = () => {
  const CategoryData: CategoryData[] = [
    {
      number: 2.152,
      name: "Người dùng",
      img: "<User />",
    },
    {
      number: 1.135,
      name: "Tài xế",
      img: "Driver",
    },
    {
      number: 618,
      name: "Chuyến đi",
      img: "Trip",
    },
    {
      number: 83,
      name: "Chuyến hủy",
      img: "User",
    },
  ];

  return (
    <div className={styles["category-container"]}>
      {CategoryData.map((data) => (
        <div className={styles["category"]} key={data.number}>
          <div className={styles["category-info"]}>
            <div className={styles["category-number"]}>{data.number}</div>
            <div className={styles["category-name"]}>{data.name}</div>
          </div>
          <div className={styles["category-img"]}>
            {data.img}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
