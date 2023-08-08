import React, { useRef } from "react";
import styles from "./admin.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import { ReactComponent as SearchIcon } from "@assets/svg/Admin/search.svg";
import { ReactComponent as FilterIcon } from "@assets/svg/Admin/filter.svg";
import { ReactComponent as SortIcon } from "@assets/svg/Admin/sort.svg";
import { ReactComponent as DownIcon } from "@assets/svg/Admin/down.svg";
import { ReactComponent as CancelIcon } from "@assets/svg/Admin/cancel.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  const role: string[] = [
    "Administrator",
    "Task Manager",
    "Income Manager",
    "IT Manager",
  ];
  const [filterData, setFilterData] = useState<String>("");

  const submitSearch = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log("search: ", searchRef.current?.value || null);
    }
  };

  const handleFilterData = (filterDataPara: string) => {
    setFilterData(filterDataPara);
  };

  const handleCancelFilterData = () => {
    setFilterData('');
  };

  return (
    <div className={styles["table-content-container"]}>
      {/* Search */}
      <div className={styles["search-filter-container"]}>
        <div className={styles["input-container"]}>
          <SearchIcon className={styles["search-icon"]} />
          <input
            ref={searchRef}
            onKeyDown={submitSearch}
            type="text"
            className={styles["input-self"]}
            placeholder="Tìm kiếm...."
          />
        </div>
        <div className={styles["filter-container"]}>
          <FilterIcon className={styles["filter-icon"]} />
          <div className={styles["filter-title"]}>Bộ lọc</div>
        </div>
        <div className={styles["filter-result-container"]}>
          {filterData === "" ? (
            <div>Không có bộ lọc nào được áp dụng</div>
          ) : (
            <div className={styles["each-filter-result-container"]}>
              <div className={styles["each-filter-result-title"]}>Chức vụ {filterData}</div>
              <CancelIcon className={styles["each-filter-result-icon"]} onClick={handleCancelFilterData}/>
            </div>
          )}
        </div>
        <div className={styles["dropdown-container"]}>
          <button className={styles["dropdown-title"]}>
            Sắp xếp <SortIcon />
          </button>
          <div className={styles["dropdown-content"]}>
            <div onClick={() => navigate("/")}>Tăng dần</div>
            <div onClick={() => navigate("/")}>Giảm dần</div>
          </div>
        </div>
      </div>
      {/* Table Header */}
      <div className={styles["table-header-container"]}>
        <div className={styles["ord-num"]}>STT</div>
        <div className={styles["staff"]}>Nhân viên</div>
        <div className={styles["dropdown-container-table"]}>
          <button className={styles["dropdown-title-table"]}>
            <div>Chức vụ</div>
            <DownIcon className={styles["dropdown-title-down"]} />
          </button>
          <div className={styles["dropdown-content-table"]}>
            {role.map((data, index) => (
              <div onClick={() => handleFilterData(data)} key={index}>
                {data}
              </div>
            ))}
          </div>
        </div>
        <div className={styles["email"]}>Email</div>
        <div className={styles["phone"]}>Số điện thoại</div>
        <div className={styles["time"]}>Đăng nhập</div>
        <div className={styles["button-container-header"]}></div>
      </div>
      {/* Table Content */}
    </div>
  );
};

export default Admin;
