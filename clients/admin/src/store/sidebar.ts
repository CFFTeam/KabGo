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

import React, {FC, ReactElement} from "react";
import { ReactNode } from "react";

interface MainMenuData {
  img: any;
  name: string;
  imgFill: string;
  active: boolean;
}

interface InitialSidebarState {
  mainMenuData: MainMenuData[];
}

const initialSidebarState: InitialSidebarState = {
  mainMenuData: [
    {
        img: Dashboard,
        name: "Dashboard",
        imgFill: DashboardFill,
        active: true
    },
    {
        img: Admin,
        name: "Admin",
        imgFill: AdminFill,
        active: false
    },
    {
        img: Driver,
        name: "Tài xế",
        imgFill: DriverFill,
        active: false
    },
    {
        img: Customer,
        name: "Khách Hàng",
        imgFill: CustomerFill,
        active: false
    },
    {
        img: Service,
        name: "Dịch vụ",
        imgFill: ServiceFill,
        active: false
    },
    {
        img: Vehicle,
        name: "Loại Phương Tiện",
        imgFill: VehicleFill,
        active: false
    },
    {
        img: Invoice,
        name: "Hóa Đơn",
        imgFill: InvoiceFill,
        active: false
    },
  ],
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialSidebarState,
  reducers: {
    updateActive(state, action: PayloadAction<number>) {
      state.mainMenuData.map((data) => data.active = false);
      state.mainMenuData[action.payload].active = true;
    },
    // updateTasklistData(state, action: PayloadAction<number>) {
    //   state.tasklistData.tasklistChild[action.payload].check =
    //     !state.tasklistData.tasklistChild[action.payload].check;
    //   if (state.tasklistData.tasklistChild[action.payload].check) {
    //     state.tasklistData.tasklistChild.push(
    //       state.tasklistData.tasklistChild.splice(action.payload, 1)[0]
    //     );
    //   } else {
    //     state.tasklistData.tasklistChild.unshift(
    //       state.tasklistData.tasklistChild.splice(action.payload, 1)[0]
    //     );
    //   }
    //   state.tasklistData.numberOfTasks =
    //     state.tasklistData.tasklistChild.filter((data) => !data.check).length;
    // },
  },
});

export const sidebarActions = sidebarSlice.actions;

export default sidebarSlice.reducer;
