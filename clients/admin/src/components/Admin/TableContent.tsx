import React from "react";
import styles from "./admin.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import {ReactComponent as SearchIcon} from "@assets/svg/Admin/search.svg"
import {ReactComponent as FilterIcon} from "@assets/svg/Admin/filter.svg"
import {ReactComponent as SortIcon} from "@assets/svg/Admin/sort.svg"
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles['table-content-container']}>
      <div className={styles['search-filter-container']}>
        <div className={styles['input-container']}>
          <SearchIcon className={styles['search-icon']}/>
          <input type="text" className={styles['input-self']} placeholder="Tìm kiếm...."/>
        </div>
        <div className={styles['filter-container']}>
          <FilterIcon className={styles['filter-icon']}/>
          <div className={styles['filter-title']}>Bộ lọc</div>
        </div>
        <div className={styles['filter-result-container']}>
          Không có bộ lọc nào được áp dụng
        </div>
        <div className={styles['dropdown-container']}>
          <button className={styles['dropdown-title']}>Sắp xếp <SortIcon /></button>
          <div className={styles['dropdown-content']}>
            <div onClick={()=>navigate("/")}>Từ A đến Z</div>
            <div onClick={()=>navigate("/")}>Từ Z đến A</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
