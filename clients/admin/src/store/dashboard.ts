import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../assets/svg/Dashboard/user.svg";
import Driver from "../assets/svg/Dashboard/driver.svg";
import Trip from "../assets/svg/Dashboard/trip.svg";
import CanceledTrip from "../assets/svg/Dashboard/canceledtrip.svg";
import Red from "../assets/svg/Dashboard/red.svg";
import Purple from "../assets/svg/Dashboard/purple.svg";
import Green from "../assets/svg/Dashboard/green.svg";
import Yellow from "../assets/svg/Dashboard/yellow.svg";
import KhangImg from "../assets/svg/Dashboard/khangimg.svg";
import KhangMedal from "../assets/svg/Dashboard/khangmedal.svg";
import KhoaImg from "../assets/svg/Dashboard/khoaimg.svg";
import KhoaMedal from "../assets/svg/Dashboard/khoamedal.svg";
import MinhImg from "../assets/svg/Dashboard/minhimg.svg";
import MinhMedal from "../assets/svg/Dashboard/minhmedal.svg";
import { log } from "console";
interface CategoryData {
  number: number;
  name: string;
  img: string;
  color: string;
}

interface ChartData {
  xLabels: string[];
  yLabels: number[];
}
interface TasklistChild {
  name: string;
  date: string;
  img: string;
  check: boolean;
}
interface TasklistData {
  numberOfTasks: number;
  tasklistChild: TasklistChild[];
}

interface TopKpiData {
  img: string;
  name: string;
  role: string;
  medal: string;
}

interface InitialDashboardState {
  categoryData: CategoryData[];
  isDoneCategoryData: boolean;
  tasklistData: TasklistData;
  topKpiData: TopKpiData[];
  chartData: ChartData;
  isDoneChartData: boolean;
}

const initialDashboardState: InitialDashboardState = {
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

  isDoneCategoryData: false,

  chartData: {
    xLabels: ["March", "April", "May", "June", "July", "August", "September"],
    yLabels: [],
  },

  isDoneChartData: false, 

  tasklistData: {
    numberOfTasks: 4,
    tasklistChild: [
      {
        name: "Thống kê doanh thu",
        date: "02 / 10 - 22h30",
        img: Purple,
        check: false,
      },
      {
        name: "Thêm task mới",
        date: "03 / 10 - 23h59",
        img: Green,
        check: false,
      },
      {
        name: "Kiểm tra hóa đơn",
        date: "04 / 10 - 23h59",
        img: Yellow,
        check: false,
      },
      {
        name: "Thống kê số giờ làm việc",
        date: "05 / 10 - 23h59",
        img: Red,
        check: false,
      },
    ],
  },

  topKpiData: [
    {
      img: KhangImg,
      name: "Đinh Nguyễn Duy Khang",
      role: "Task Manager",
      medal: KhangMedal,
    },
    {
      img: KhoaImg,
      name: "Nguyễn Thoại Đăng Khoa",
      role: "Income Manager",
      medal: KhoaMedal,
    },
    {
      img: MinhImg,
      name: "Nguyễn Đức Minh",
      role: "IT Manager",
      medal: MinhMedal,
    },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    updateCategoryData(state, action: PayloadAction<number[]>) {
      for (let i = 0; i < state.categoryData.length; i++) {
        state.categoryData[i].number = action.payload[i];
      }
      state.isDoneCategoryData = true;
    },
    updateTasklistState(state, action: PayloadAction<number>) {
      state.tasklistData.tasklistChild[action.payload].check =
        !state.tasklistData.tasklistChild[action.payload].check;
      state.tasklistData.numberOfTasks =
        state.tasklistData.tasklistChild.filter((data) => !data.check).length;
    },
    updateTasklistPosition(state, action: PayloadAction<number>) {
      if (state.tasklistData.tasklistChild[action.payload].check) {
        state.tasklistData.tasklistChild.push(
          state.tasklistData.tasklistChild.splice(action.payload, 1)[0]
        );
      } else {
        state.tasklistData.tasklistChild.unshift(
          state.tasklistData.tasklistChild.splice(action.payload, 1)[0]
        );
      }
    },
    updateRevenue(state, action: PayloadAction<number[]>){
      state.chartData.yLabels = [...action.payload];
      state.isDoneChartData = true;
    }
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
