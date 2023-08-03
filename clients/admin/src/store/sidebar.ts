import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import Admin from "../assets/svg/Sidebar/admin.svg";
import Customer from "../assets/svg/Sidebar/customer.svg";
import Driver from "../assets/svg/Sidebar/driver.svg";
import Dashboard from "../assets/svg/Sidebar/dashboard.svg";
import Invoice from "../assets/svg/Sidebar/invoice.svg";
import Service from "../assets/svg/Sidebar/service.svg";
import Vehicle from "../assets/svg/Sidebar/vehicle.svg";
import Admin from "../assets/svg/Sidebar/admin.svg";
import React, {FC, ReactElement} from "react";
import { ReactNode } from "react";

interface MainMenuData {
  img: any;
  name: string;
  arrow: boolean;
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
        arrow: false,
        active: true
    },
    {
        img: Admin,
        name: "Admin",
        arrow: true,
        active: false
    },
    {
        img: Driver,
        name: "Tài xế",
        arrow: true,
        active: false
    },
    {
        img: Customer,
        name: "Khách Hàng",
        arrow: true,
        active: false
    },
    {
        img: Service,
        name: "Service <br> Phương Tiện",
        arrow: false,
        active: false
    },
    {
        img: Vehicle,
        name: "Loại Phương Tiện",
        arrow: false,
        active: false
    },
    {
        img: Invoice,
        name: "Hóa Đơn",
        arrow: true,
        active: false
    },
  ],
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initialSidebarState,
  reducers: {
    // updateCategoryData(state, action: PayloadAction<number[]>) {
    //   for (let i = 0; i < state.categoryData.length; i++) {
    //     state.categoryData[i].number = action.payload[i];
    //   }
    // },
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
