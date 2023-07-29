import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../assets/svg/Dashboard/user.svg";
import Driver from "../assets/svg/Dashboard/driver.svg";
import Trip from "../assets/svg/Dashboard/trip.svg";
import CanceledTrip from "../assets/svg/Dashboard/canceledtrip.svg";
import Red from "../assets/svg/Dashboard/red.svg";
import Purple from "../assets/svg/Dashboard/purple.svg";
import Green from "../assets/svg/Dashboard/green.svg";
import Yellow from "../assets/svg/Dashboard/yellow.svg";

interface CategoryData {
  number: number;
  name: string;
  img: string;
  color: string;
}

interface TasklistData {
  name: string;
  date: string;
  img: string;
}

interface initialDashboardState {
  categoryData: CategoryData[];
  tasklistData: TasklistData[];
}

const initialDashboardState: initialDashboardState = {
  categoryData: [
    {
      number: 0,
      name: "Người dùng",
      img: User,
      color: "#6445C2",
    },
    {
      number: 0,
      name: "Tài xế",
      img: Driver,
      color: "#EBB100",
    },
    {
      number: 0,
      name: "Chuyến đi",
      img: Trip,
      color: "#21AA89",
    },
    {
      number: 0,
      name: "Chuyến hủy",
      img: CanceledTrip,
      color: "#F93232",
    },
  ],

  tasklistData:[
    {
      name: "Thống kê doanh thu",
      date: "02 / 07 - 22h30",
      img: Purple
    },
    {
      name: "Thêm task mới",
      date: "03 / 07 - 23h59",
      img: Green
    },
    {
      name: "Kiểm tra hóa đơn",
      date: "04 / 07 - 23h59",
      img: Yellow
    },
    {
      name: "Thống kê số giờ làm việc",
      date: "05 / 07 - 23h59",
      img: Red
    },
  ]
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    updateCategoryData(state, action: PayloadAction<number[]>) {
      for(let i=0; i<state.categoryData.length; i++){
        state.categoryData[i].number = action.payload[i];
      }
    },
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
