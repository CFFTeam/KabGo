import React, { useRef } from "react";
import styles from "./newAccount.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/dashboard";
import { useEffect } from "react";
import { ReactComponent as Vertical } from "@assets/svg/NewAccount/vertical.svg";
import { ReactComponent as SortIcon } from "@assets/svg/Admin/sort.svg";
import axios from "axios";
import $ from "jquery";

const NewAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  
  const submitSearch = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log("search: ", nameRef.current?.value || null);
    }
  };

  return (
    <div className={styles["create-account-container"]}>
      <div className={styles["flex-layout-container"]}>
        <div className={styles["info-pass-container"]}>
          <div className={styles["info-container"]}>
            <div className={styles["info-title"]}>Thông tin cá nhân</div>
            {/* Name-Phone-Gender */}
            <div className={styles["name-phone-gender-container"]}>
              <div className={styles["name-container"]}>
                <div className={styles["prop-title"]}>
                  Họ và tên <span style={{ color: "red" }}>*</span>
                </div>
                <input
                  ref={nameRef}
                  type="text"
                  className={styles["input-self"]}
                  placeholder="Nguyễn Văn An"
                />
              </div>
              <div className={styles["phone-container"]}>
                <div className={styles["prop-title"]}>
                  Số điện thoại <span style={{ color: "red" }}>*</span>
                </div>
                <input
                  ref={phoneRef}
                  type="text"
                  className={styles["input-self"]}
                  placeholder="0123456789"
                />
              </div>
              <div className={styles["gender-container"]}>
                <div className={styles["prop-title"]}>
                  Giới tính <span style={{ color: "red" }}>*</span>
                </div>
                <div className={styles["dropdown-container"]}>
                  <button className={styles["dropdown-title"]}>
                    Giới tính <SortIcon />
                  </button>
                  <div className={styles["dropdown-content"]}>
                    <div onClick={() => console.log('nam')}>Tăng dần</div>
                    <div onClick={() => console.log('nu')}>Giảm dần</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Email-Role */}
            <div className={styles["email-role-container"]}>
              <div className={styles["email-container"]}>
                <div className={styles["prop-title"]}>
                  Địa chỉ Email <span style={{ color: "red" }}>*</span>
                </div>
                <input
                  ref={emailRef}
                  type="text"
                  className={styles["input-self"]}
                  placeholder="example@gmail.com"
                />
              </div>
              <div className={styles["role-container"]}>
                <div className={styles["prop-title"]}>
                  Chức vụ <span style={{ color: "red" }}>*</span>
                </div>
                <input
                  ref={roleRef}
                  type="text"
                  className={styles["input-self"]}
                  placeholder="Administrator"
                />
              </div>
            </div>
            {/* Address */}
            <div className={styles["address-container"]}>
              <div className={styles["address-only-container"]}>
                <div className={styles["prop-title"]}>
                  Địa chỉ nhà
                </div>
                <input
                  ref={addressRef}
                  type="text"
                  className={styles["input-self"]}
                  placeholder="Đường, Phường, Quận, Thành phố"
                />
              </div>
            </div>
          </div>
        </div>
        <Vertical className={styles["vertical-svg"]} />
        <div className={styles["profile-container"]}></div>
      </div>
    </div>
  );
};

export default NewAccount;
