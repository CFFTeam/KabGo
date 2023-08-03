import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import statisticIcon from "@assets/svg/Sidebar/statisticIcon.svg";
import dashboardIcon from "@assets/svg/Sidebar/dashboardIcon.svg";
import carBookingIcon from "@assets/svg/Sidebar/carBookingIcon.svg";
import reportIcon from "@assets/svg/Sidebar/report.svg";
import teamMemberIcon from "@assets/svg/Sidebar/teamMemberIcon.svg";
import contactIcon from "@assets/svg/Sidebar/contactIcon.svg";
import feedbackIcon from "@assets/svg/Sidebar/feedbackIcon.svg";

import statisticIconFill from "@assets/svg/Sidebar/statisticIconFill.svg";
import dashboardIconFill from "@assets/svg/Sidebar/dashboardIconFill.svg";
import carBookingIconFill from "@assets/svg/Sidebar/carBookingIconFill.svg";
import reportIconFill from "@assets/svg/Sidebar/reportFill.svg";
import teamMemberIconFill from "@assets/svg/Sidebar/teamMemberIconFill.svg";
import contactIconFill from "@assets/svg/Sidebar/contactIconFill.svg";
import feedbackIconFill from "@assets/svg/Sidebar/feedbackIconFill.svg";

import React, {FC, ReactElement} from "react";
import { ReactNode } from "react";

interface MainMenuData {
  img: any;
  name: string;
  imgFill: string;
  active: boolean;
}

interface PreferencesData {
  img: any;
  name: string;
  imgFill: string;
  active: boolean;
}

interface InitialSidebarState {
  mainMenuData: MainMenuData[];
  preferencesData: PreferencesData[]
}

const initialSidebarState: InitialSidebarState = {
  mainMenuData: [
    {
        img: dashboardIcon,
        name: "Dashboard",
        imgFill: dashboardIconFill,
        active: false
    },
    {
        img: carBookingIcon,
        name: "Xử lý điều phối",
        imgFill: carBookingIconFill,
        active: true
    },
    {
        img: statisticIcon,
        name: "Thống kê",
        imgFill: statisticIconFill,
        active: false
    },
    {
        img: reportIcon,
        name: "Báo cáo",
        imgFill: reportIconFill,
        active: false
    },
  ],
  preferencesData: [
    {
        img: teamMemberIcon,
        name: "Thành viên",
        imgFill: teamMemberIconFill,
        active: false
    },
    {
        img: contactIcon,
        name: "Liên hệ",
        imgFill: contactIconFill,
        active: false
    },
    {
        img: feedbackIcon,
        name: "Đánh giá",
        imgFill: feedbackIconFill,
        active: false
    },
  ]
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialSidebarState,
  reducers: {
    updateActive(state, action: PayloadAction<any[]>) {
      state.mainMenuData.map((data) => data.active = false);
      state.preferencesData.map((data) => data.active = false);
      action.payload[1]=== "main-menu" ?
        state.mainMenuData[action.payload[0]].active = true:
        state.preferencesData[action.payload[0]].active = true;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;

export default sidebarSlice.reducer;