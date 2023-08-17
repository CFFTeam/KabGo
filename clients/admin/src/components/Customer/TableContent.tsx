import React, { useRef } from "react";
import styles from "./customer.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import { ReactComponent as SearchIcon } from "@assets/svg/Admin/search.svg";
import { ReactComponent as FilterIcon } from "@assets/svg/Admin/filter.svg";
import { ReactComponent as SortIcon } from "@assets/svg/Admin/sort.svg";
import { ReactComponent as DownIcon } from "@assets/svg/Admin/down.svg";
import { ReactComponent as CancelIcon } from "@assets/svg/Admin/cancel.svg";
import { ReactComponent as AvatarIcon } from "@assets/svg/Admin/avatar.svg";
import { ReactComponent as EditIcon } from "@assets/svg/Admin/edit.svg";
import { ReactComponent as LockIcon } from "@assets/svg/Admin/lock.svg";
import { ReactComponent as UnlockIcon } from "@assets/svg/Admin/unlock.svg";
import UserAvatar from "@assets/images/UserAvata.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Table: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  // useEffect(()=>{
    
  // }, []);

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
    setFilterData("");
  };

  const numberServices: string[] = [
    "01",
    "02",
    "03",
    "04",
  ];

  interface elementTableData {
    fullname: string;
    numServices: string;
    phone: string;
    account: string;
    active: string;
    lock: boolean;
  }

  const arrayElementTableData: elementTableData[] = [
    {
      fullname: "Trần Đàm Gia Huy",
      numServices: "04",
      phone: "0703350128",
      account: "200.000đ",
      active: "12/08/2023",
      lock: false,
    },
    {
      fullname: "Đinh Nguyễn Duy Khang",
      numServices: "04",
      phone: "0703350128",
      account: "200.000đ",
      active: "12/08/2023",
      lock: false,
    },
    {
      fullname: "Nguyễn Thoại Đăng Khoa",
      numServices: "04",
      phone: "0703350128",
      account: "200.000đ",
      active: "12/08/2023",
      lock: false,
    },
    {
      fullname: "Culi thích code",
      numServices: "04",
      phone: "0703350128",
      account: "200.000đ",
      active: "12/08/2023",
      lock: false,
    },
    {
      fullname: "Cải xanh",
      numServices: "04",
      phone: "0703350128",
      account: "200.000đ",
      active: "12/08/2023",
      lock: false,
    },
    {
      fullname: "Cải xanh",
      numServices: "04",
      phone: "0703350128",
      account: "200.000đ",
      active: "12/08/2023",
      lock: true,
    },
    {
      fullname: "Culi thích code",
      numServices: "04",
      phone: "0703350128",
      account: "200.000đ",
      active: "12/08/2023",
      lock: false,
    },
    {
      fullname: "Cải xanh",
      numServices: "04",
      phone: "0703350128",
      account: "200.000đ",
      active: "12/08/2023",
      lock: false,
    },
    {
      fullname: "Cải xanh",
      numServices: "04",
      phone: "0703350128",
      account: "200.000đ",
      active: "12/08/2023",
      lock: false,
    },
  ];

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
              <div className={styles["each-filter-result-title"]}>
                {filterData} Dịch vụ
              </div>
              <CancelIcon
                className={styles["each-filter-result-icon"]}
                onClick={handleCancelFilterData}
              />
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
        <div className={styles["staff"]}>Khách hàng</div>
        <div className={styles["dropdown-container-table"]}>
          <button className={styles["dropdown-title-table"]}>
            <div>Số lượng dịch vụ</div>
            <DownIcon className={styles["dropdown-title-down"]} />
          </button>
          <div className={styles["dropdown-content-table"]}>
            {numberServices.map((data, index) => (
              <div onClick={() => handleFilterData(data)} key={index}>
                {data}
              </div>
            ))}
          </div>
        </div>
        <div className={styles["phone"]}>Số điện thoại</div>
        <div className={styles["acc"]}>Tài khoản</div>
        <div className={styles["time"]}>Hoạt động</div>
        <div className={styles["button-container-header"]}></div>
      </div>
      {/* Table Content */}
      <div className={styles["table-sub-content-container"]}>
        {arrayElementTableData.map((data, index) => (
          <div className={styles["table-body-relative-container"]} key={index}>
            <div
              className={`${styles["table-body-container"]} ${
                index % 2 === 1 ? styles["odd-background"] : ""
              }`}
            >
              <div className={styles["ord-num-body"]}>{index + 1}</div>
              <div className={styles["staff-body"]}>
                <img src={UserAvatar} />
                <div>{data.fullname}</div>
              </div>
              <div className={styles["role-body"]}>{data.numServices}</div>
              <div className={styles["phone-body"]}>{data.phone}</div>
              <div className={styles["acc-body"]}>{data.account}</div>
              <div className={styles["time-body"]}>{data.active}</div>
              <div
                className={`${styles["button-container-body"]} ${
                  data.lock ? styles["hide-icon"] : ""
                }`}
              >
                <div className={styles["edit-body"]}>
                  <EditIcon />
                </div>
                <div className={styles["lock-body"]}>
                  <LockIcon />
                </div>
              </div>
            </div>
            {data.lock && (
              <div className={styles["table-lock-container"]}>
                <div className={styles["table-lock-title"]}>
                  TÀI KHOẢN ĐANG BỊ KHÓA
                </div>
                <UnlockIcon className={styles["table-unlock-icon"]} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
