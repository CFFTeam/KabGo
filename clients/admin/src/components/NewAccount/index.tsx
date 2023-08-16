import React, { useRef, useState } from "react";
import styles from "./newAccount.module.css";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import {useNavigate} from "react-router-dom"
import { dashboardActions } from "@store/dashboard";
import { useEffect } from "react";
import { ReactComponent as Vertical } from "@assets/svg/NewAccount/vertical.svg";
import { ReactComponent as SortIcon } from "@assets/svg/Admin/sort.svg";
import { ReactComponent as Horizontal } from "@assets/svg/NewAccount/horizontal.svg";
import { ReactComponent as Box } from "@assets/svg/NewAccount/box.svg";
import { ReactComponent as Tick } from "@assets/svg/NewAccount/tick.svg";
import { ReactComponent as Untick } from "@assets/svg/NewAccount/untick.svg";
import { ReactComponent as Ava } from "@assets/svg/NewAccount/ava.svg";
import { ReactComponent as AutoPass } from "@assets/svg/NewAccount/autopass.svg";

import axios from "axios";
import $ from "jquery";
import toast from "react-hot-toast";

const NewAccount: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState<string>("Giới tính");
  const [autoPass, setAutoPass] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const confpassRef = useRef<HTMLInputElement>(null);
  let emptyName: string[] = []

  const checkEmpty = (getFormData: any) =>{
    emptyName = [];
    if(getFormData.name === null) emptyName.push('name');
    if(getFormData.phone === null) emptyName.push('phone');
    if(getFormData.email === null) emptyName.push('email');
    if(getFormData.role === null) emptyName.push('role');
    if(getFormData.pass=== null) emptyName.push('pass');
    if(getFormData.confpass === null) emptyName.push('confpass');
    if(emptyName.length !== 0) return true;
    else return false;
  }

  const changeBorderRed = (emptyName: string[]) => {
    for(let i: number=0; i<emptyName.length; i++){
      $(`#${emptyName[i]}`).css('border', '1.5px solid red');
    }
  }

  const clearBorderRed = (emptyName: string[]) => {
    for(let i: number=0; i<emptyName.length; i++){
      setTimeout(function() {
        $(`#${emptyName[i]}`).css('border', '');
      }, 2000);
    }
  }

  const submitSearch = () => {

    const getFormData = {
      name: nameRef.current?.value || null,
      phone: phoneRef.current?.value || null,
      gender: gender==='Giới tính' ? null : gender,
      email: emailRef.current?.value || null,
      role: roleRef.current?.value || null,
      address: addressRef.current?.value || null,
      pass: passRef.current?.value || null,
      confpass: confpassRef.current?.value || null,
    }

    if(checkEmpty(getFormData)){
      changeBorderRed(emptyName);
      clearBorderRed(emptyName);  
      toast.error('Vui lòng nhập đầy đủ thông tin', {
        style: {
          border: '2px solid red',
          padding: '10px',
          color: 'red',
          fontWeight: '500'
        },
        duration: 3000
      });
    }
    else{
      navigate("/admin");
      toast.success('Tạo tài khoản thành công', {
        style: {
          border: '2px solid #28a745',
          padding: '10px',
          color: '#28a745',
          fontWeight: '500'
        },
        duration: 3000
      });
    }
  };

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
        submitSearch();
      }
  }

  const genderHandle = (gender: string) => {
    setGender(gender);
  };

  const autoPassHandle = () => {
    setAutoPass((prev) => !prev);
  };

  return (
    <div onKeyDown={handleEnter} className={styles["create-account-container"]}>
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
                  id="name"
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
                  id="phone"
                  ref={phoneRef}
                  type="text"
                  className={styles["input-self"]}
                  placeholder="0123456789"
                />
              </div>
              <div className={styles["gender-container"]}>
                <div className={styles["prop-title"]}>
                  Giới tính
                </div>
                <div className={styles["dropdown-container"]}>
                  <button
                    className={`${styles["dropdown-title"]} ${
                      gender !== "Giới tính" ? styles["color-black"] : ""
                    }`}
                  >
                    {gender} <SortIcon />
                  </button>
                  <div className={styles["dropdown-content"]}>
                    <div onClick={() => genderHandle("Nam")}>Nam</div>
                    <div onClick={() => genderHandle("Nữ")}>Nữ</div>
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
                  id="email"
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
                  id="role"
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
                <div className={styles["prop-title"]}>Địa chỉ nhà</div>
                <input
                  id="address"
                  ref={addressRef}
                  type="text"
                  className={styles["input-self"]}
                  placeholder="Đường, Phường, Quận, Thành phố"
                />
              </div>
            </div>
          </div>
          {/* Horizon */}
          <div className={styles["horizon-svg"]} />
          {/* Password */}
          <div className={styles["pass-container"]}>
            <div className={styles["pass-title"]}>
              Tạo mật khẩu <span style={{ color: "red" }}>*</span>
            </div>
            <div className={styles["box-subtitle-container"]}>
              {!autoPass ? (
                <Box
                  className={styles["box-container"]}
                  onClick={autoPassHandle}
                />
              ) : (
                <AutoPass
                  className={styles["box-container"]}
                  onClick={autoPassHandle}
                />
              )}
              <div className={styles["subtitle-container"]}>
                Tự động tạo mật khẩu
              </div>
            </div>
            <div className={styles["passenter-conf-container"]}>
              <div className={styles["passenter-container"]}>
                <div className={styles["prop-title"]}>
                  Mật khẩu <span style={{ color: "red" }}>*</span>
                </div>
                <input
                  id="pass"
                  ref={passRef}
                  type="password"
                  className={styles["input-self"]}
                  placeholder="Password"
                />
              </div>
              <div className={styles["role-container"]}>
                <div className={styles["prop-title"]}>
                  Xác nhận mật khẩu <span style={{ color: "red" }}>*</span>
                </div>
                <input
                  id="confpass"
                  ref={confpassRef}
                  type="password"
                  className={styles["input-self"]}
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className={styles["sendemail-sms-container"]}>
              <div className={styles["sendemail-container"]}>
                <Tick />
                <div className={styles["sendemail-title"]}>
                  Gửi mật khẩu qua địa chỉ email
                </div>
              </div>
              <div className={styles["sms-container"]}>
                <Untick />
                <div className={styles["sms-title"]}>
                  Gửi mật khẩu qua tin nhắn SMS
                </div>
              </div>
            </div>
          </div>
        </div>
        <Vertical className={styles["vertical-svg"]} />
        <div className={styles["profile-container"]}>
          <div className={styles["sub-pro-container"]}>
            <div className={styles["profile-title"]}>Ảnh đại diện</div>
            <Ava className={styles["ava-self"]} />
            <div className={styles["choose-ava"]}>Chọn ảnh</div>
          </div>
          <div className={styles["submit-container"]}>
            <div className={styles["cancel"]}>Hủy bỏ</div>
            <div className={styles["create"]} onClick={submitSearch}>Tạo tài khoản</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;
