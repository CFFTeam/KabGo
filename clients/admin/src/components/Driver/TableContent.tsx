import React, { useRef } from "react";
import styles from "./driver.module.css";
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
  const [arrayElementTableData, setArrayElementTableData] = useState<elementTableData[]>([]);
  const [initArrayElementTableData, setInitArrayElementTableData] = useState<elementTableData[]>([]);

  const [arrNumberServices, setArrNumberServices] = useState<number[]>([]);

  useEffect(() => {
    getDatabyApi();
  }, []);

  const [filterData, setFilterData] = useState<number>(-1);

  const getDatabyApi = async () => {
    axios.get(`${process.env.REACT_APP_API_URI}/driver`).then((res) => {
      getAllData(res);
    }).catch(err => {console.log(err)});
  }

  const submitSearch = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // console.log("search: ", searchRef.current?.value || null);
    }
  };

  const getAllData = (res: any) => {
    const arrayData = res.data.data.reverse();
    for (let i = 0; i < arrayData.length; i++) {
      if (Object.hasOwn(arrayData[i], 'vehicle')) {
        arrayData[i].numServices = arrayData[i].vehicle.length;
      }
      else{
        arrayData[i].numServices = 0;
      }
    }
    let numberServices: number[] = [];
    for (let i = 0; i < arrayData.length; i++) {
      if (numberServices.includes(arrayData[i].numServices) === false){
        numberServices.push(arrayData[i].numServices);
      }
    }
    setInitArrayElementTableData([...arrayData]);
    setArrayElementTableData([...arrayData]);
    setArrNumberServices([...numberServices]);
    // console.log(arrayElementTableData);
  };

  const handleFilterData = (filterDataPara: number) => {
    setFilterData(filterDataPara);

    setArrayElementTableData([
      ...initArrayElementTableData.filter((data) => 
        data.vehicle.length === filterDataPara
      ),
    ]);
  };

  const handleCancelFilterData = () => {
    setFilterData(-1);
    setArrayElementTableData([...initArrayElementTableData]);
  };

  const handleLockAccount = (id: string) => {
    axios
    .post(`${process.env.REACT_APP_API_URI}/driver/lock-account?id=${id}`)
    .then((res) => {
      if(res.data.success){
        getDatabyApi();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  interface eachVehicle{
    name: string;
    brand: string;
    type: string;
    color: string;
    service: string;
    number: string;
  }
  interface elementTableData {
    name: string;
    numServices: number;
    phonenumber: string;
    rate: number;
    lock: boolean;
    _id: string;
    active: string;
    vehicle: eachVehicle[];
  }

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
          {filterData === -1 ? (
            <div>Không có bộ lọc nào được áp dụng</div>
          ) : (
            <div className={styles["each-filter-result-container"]}>
              <div className={styles["each-filter-result-title"]}>
              Số lượng xe: {filterData}
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
        <div className={styles["staff"]}>Tài xế</div>
        <div className={styles["dropdown-container-table"]}>
          <button className={styles["dropdown-title-table"]}>
            <div>Số lượng xe</div>
            <DownIcon className={styles["dropdown-title-down"]} />
          </button>
          <div className={styles["dropdown-content-table"]}>
            {arrNumberServices.map((data, index) => (
              <div onClick={() => handleFilterData(data)} key={index}>
                {data}
              </div>
            ))}
          </div>
        </div>
        <div className={styles["phone"]}>Số điện thoại</div>
        <div className={styles["acc"]}>Đánh giá</div>
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
                <div>{data.name}</div>
              </div>
              <div className={styles["role-body"]}>{data.numServices}</div>
              <div className={styles["phone-body"]}>{data.phonenumber}</div>
              <div className={styles["acc-body"]}>{data.rate}</div>
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
                  <LockIcon onClick={()=>{handleLockAccount(data._id)}}/>
                </div>
              </div>
            </div>
            {data.lock && (
              <div className={styles["table-lock-container"]}>
                <div className={styles["table-lock-title"]}>
                  TÀI KHOẢN ĐANG BỊ KHÓA
                </div>
                <UnlockIcon className={styles["table-unlock-icon"]} onClick={()=>{handleLockAccount(data._id)}}/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
