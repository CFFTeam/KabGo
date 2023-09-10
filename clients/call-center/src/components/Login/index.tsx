import React, { useRef } from "react";
import styles from "./Login.module.css";
import bg from "../../assets/images/bg.png";
import { ReactComponent as Title } from "@assets/svg/Login/login.svg";
import { ReactComponent as Eye } from "@assets/svg/Login/eye.svg";
import axios from "axios";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, redirect } from "react-router-dom";
import { authStorage } from "@utils/storage";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  let emptyName: string[] = [];

  const styleSuccess = {
    style: {
      border: "2px solid #28a745",
      padding: "10px",
      color: "#28a745",
      fontWeight: "500",
    },
    duration: 1500,
  };

  const styleError = {
    style: {
      border: "2px solid red",
      padding: "10px",
      color: "red",
      fontWeight: "500",
    },
    duration: 4000,
  };

  const checkEmpty = (getFormData: any) => {
    emptyName = [];
    if (getFormData.email === null) emptyName.push("email");
    if (getFormData.password === null) emptyName.push("password");
    if (emptyName.length !== 0) return true;
    else return false;
  };

  const changeBorderRed = (emptyName: string[]) => {
    for (let i: number = 0; i < emptyName.length; i++) {
      $(`#${emptyName[i]}`).css("border", "1.5px solid red");
      $(`#${emptyName[i]}`).css("background", "#FFEFEF");
    }
  };

  const clearBorderRed = (emptyName: string[]) => {
    for (let i: number = 0; i < emptyName.length; i++) {
      setTimeout(function () {
        $(`#${emptyName[i]}`).css("border", "");
        $(`#${emptyName[i]}`).css("background", "");
      }, 4000);
    }
  };

  const submitLogin = () => {
    const getFormData = {
      email: emailRef.current?.value || null,
      password: passwordRef.current?.value || null,
    };

    if (checkEmpty(getFormData)) {
      changeBorderRed(emptyName);
      clearBorderRed(emptyName);
      toast.error("Vui lòng nhập đầy đủ thông tin", styleError);
    } else {
      axios
        .post(
          `${process.env.REACT_APP_AUTH_API_URI}/v1/call-center/login`,
          getFormData
        )
        .then((res) => {
          if (res.data.status === "success") {
            authStorage.authenticate({
              ...res.data.data.employee_info,
              access_token: res.data.data.access_token,
            });
            toast.success("Đăng nhập thành công", styleSuccess);
            setTimeout(function () {
              // navigate("/dashboard");
              if (authStorage.getAuthData()?.role === "Receptionist") {
                navigate("/call-receipt");
              } else if (authStorage.getAuthData()?.role === "Coordinator") {
                navigate("/call-receipt-handle");
              } else if (authStorage.getAuthData()?.role === "Supervisor") {
                navigate("/dashboard");
              } else navigate("/");
            }, 1500);
          } else {
            toast.error(res.data.message, styleError);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEnter = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      submitLogin();
    }
  };

  return (
    <div onKeyDown={handleEnter} className={styles["img-container"]}>
      <div className={styles["modal-container"]}>
        <Title className={styles["title-container"]} />
        <div className={styles["email-pass-container"]}>
          <div className={styles["email-pass-text"]}>Email</div>
          <input
            id="email"
            ref={emailRef}
            type="email"
            className={styles["input-self"]}
            placeholder="Nhập email"
          />
        </div>
        <div className={styles["email-pass-container"]}>
          <div className={styles["email-pass-text"]}>Mật khẩu</div>
          <input
            id="password"
            ref={passwordRef}
            type="password"
            className={styles["input-self"]}
            placeholder="Nhập mật khẩu"
          />
          <Eye className={styles["email-pass-svg"]} />
        </div>
        <div className={styles["button-container"]} onClick={submitLogin}>
          <div className={styles["button-text"]}>ĐĂNG NHẬP</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
