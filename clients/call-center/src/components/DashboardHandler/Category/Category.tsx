import React, { useEffect, useState } from "react";
import styles from "./Category.module.css";
import Finish from "@assets/svg/Dashboard/finish.svg";
import Coordinating from "@assets/svg/Dashboard/coordinating.svg";
import Doing from "@assets/svg/Dashboard/doing.svg";
import Cancel from "@assets/svg/Dashboard/cancel.svg";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";

const Category: React.FC = () => {
  interface CategoryData {
    number: number;
    name: string;
    img: string;
    color: string;
  }

  const initData = useAppSelector((state) => state.dashboard);

  // const [categoryData, setCategoryData] = useState<CategoryData[]>([
  //   {
  //     number: 0,
  //     name: "Hoàn thành",
  //     img: Finish,
  //     color: "#21AA89",
  //   },
  //   {
  //     number: 0,
  //     name: "Đang tiến hành",
  //     img: Doing,
  //     color: "#F93232",
  //   },
  //   {
  //     number: 0,
  //     name: "Đang điều phối",
  //     img: Coordinating,
  //     color: "#EBB100",
  //   },
  //   {
  //     number: 0,
  //     name: "Đã hủy",
  //     img: Cancel,
  //     color: "#868e96",
  //   },
  // ]);

  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  useEffect(() => {
    const numOfFinished = initData.filter(el => el.status ==="Hoàn thành").length;
    const numOfDoing = initData.filter(el => el.status ==="Đang tiến hành").length;
    const numOfCoordinating = initData.filter(el => el.status ==="Đang điều phối").length;
    const numOfCancel = initData.filter(el => el.status ==="Đã hủy").length;
    setCategoryData([
      {
        number: numOfFinished,
        name: "Hoàn thành",
        img: Finish,
        color: "#21AA89",
      },
      {
        number: numOfDoing,
        name: "Đang tiến hành",
        img: Doing,
        color: "#F93232",
      },
      {
        number: numOfCoordinating,
        name: "Đang điều phối",
        img: Coordinating,
        color: "#EBB100",
      },
      {
        number: numOfCancel,
        name: "Đã hủy",
        img: Cancel,
        color: "#868e96",
      },
    ])
  }, [initData]);

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
