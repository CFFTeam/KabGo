import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import Admin from "../assets/svg/Sidebar/admin.svg";
import Customer from "../assets/svg/Sidebar/customer.svg";
import Driver from "../assets/svg/Sidebar/driver.svg";
import Dashboard from "../assets/svg/Sidebar/dashboard.svg";
import Invoice from "../assets/svg/Sidebar/invoice.svg";
import Service from "../assets/svg/Sidebar/service.svg";
import Vehicle from "../assets/svg/Sidebar/vehicle.svg";
import Admin from "../assets/svg/Sidebar/admin.svg";

import CustomerFill from "../assets/svg/Sidebar/customerfill.svg";
import DriverFill from "../assets/svg/Sidebar/driverfill.svg";
import DashboardFill from "../assets/svg/Sidebar/dashboardfill.svg";
import InvoiceFill from "../assets/svg/Sidebar/invoicefill.svg";
import ServiceFill from "../assets/svg/Sidebar/servicefill.svg";
import VehicleFill from "../assets/svg/Sidebar/vehiclefill.svg";
import AdminFill from "../assets/svg/Sidebar/adminfill.svg";

import Setting from "../assets/svg/Sidebar/setting.svg";
import Map from "../assets/svg/Sidebar/map.svg";
import Theme from "../assets/svg/Sidebar/theme.svg";

import SettingFill from "../assets/svg/Sidebar/settingfill.svg";
import MapFill from "../assets/svg/Sidebar/mapfill.svg";
import ThemeFill from "../assets/svg/Sidebar/themefill.svg";

import React, {FC, ReactElement} from "react";
import { ReactNode } from "react";

interface MainMenuData {
  img: any;
  url: string;
  name: string;
  imgFill: string;
  active: boolean;
}

interface PreferencesData {
  img: any;
  url: string;
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
        img: Dashboard,
        url: "/",
        name: "Dashboard",
        imgFill: DashboardFill,
        active: true
    },
    {
        img: Admin,
        url: "/employee",
        name: "Nhân viên",
        imgFill: AdminFill,
        active: false
    },
    {
        img: Driver,
        url: "/driver",
        name: "Tài xế",
        imgFill: DriverFill,
        active: false
    },
    {
        img: Customer,
        url: "/customer",
        name: "Khách Hàng",
        imgFill: CustomerFill,
        active: false
    },
    {
        img: Service,
        url: "/",
        name: "Dịch vụ",
        imgFill: ServiceFill,
        active: false
    },
    {
        img: Vehicle,
        url: "/",
        name: "Loại Phương Tiện",
        imgFill: VehicleFill,
        active: false
    },
    {
        img: Invoice,
        url: "/",
        name: "Hóa Đơn",
        imgFill: InvoiceFill,
        active: false
    },
  ],
  preferencesData: [
    {
        img: Setting,
        url: "/",
        name: "Cài Đặt",
        imgFill: SettingFill,
        active: false
    },
    {
        img: Map,
        url: "/",
        name: "Theme Bản Đồ",
        imgFill: MapFill,
        active: false
    },
    {
        img: Theme,
        url: "/",
        name: "Dark Mode",
        imgFill: ThemeFill,
        active: false
    },
  ]
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialSidebarState,
  reducers: {
    updateActive(state, action: PayloadAction<number[]>) {
      state.mainMenuData.map((data) => data.active = false);
      state.preferencesData.map((data) => data.active = false);
      action.payload[1]===1 ?
        state.mainMenuData[action.payload[0]].active = true:
        state.preferencesData[action.payload[0]].active = true;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;

export default sidebarSlice.reducer;
