import styles from "./Dashboard.module.css";
import { ReactComponent as SearchIcon } from "@assets/svg/CallReceiptHandler/search-icn.svg";
import { ReactComponent as DownIcon } from "@assets/svg/Dashboard/down.svg";
import { callReceiptHandlerActions } from "@store/reducers/callReceiptHandlerSlice";
import io, { Socket } from "socket.io-client";
import $ from "jquery";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { dashboardActions } from "@store/reducers/dashboardSlice";
import LoadingSpinner from "@components/SmallLoadingSpinner/SmallLoadingSpinner";

interface DashboardInformation {
  customer: string;
  driver: string;
  time: string;
  vehicleType: string;
  status: string;
  arrivalAddress: string;
}
const DashboardTable: React.FC = () => {
  const initData = useAppSelector((state) => state.dashboard);
  const [receivedBookingInformation, setReceivedBookingInformation] = useState<any>({});
  // console.log("no socket: ", initData);
  const [dashboardData, setDashboardData] =
    useState<DashboardInformation[]>(initData);
  const [timeData, setTimeData] = useState<string>("Thời gian");
  const [vehicleData, setVehicleData] = useState<string>("Loại xe");
  const [statusData, setStatusData] = useState<string>("Trạng thái");
  const handleFilter = (id: string, dataFilter: string) => {
    // $(`#${id}`).text(dataFilter);
    if (id === "time_title") {
      setTimeData(dataFilter);
    } else if (id === "vehicle_title") {
      setVehicleData(dataFilter);
      let filterStatus: DashboardInformation[] = [];

      if (statusData !== "Trạng thái") {
        filterStatus = initData.filter((data) => data.status === statusData);
      } else {
        filterStatus = [...initData];
      }
      if (dataFilter === "Loại xe") setDashboardData(filterStatus);
      else {
        setDashboardData(
          filterStatus.filter((data) => data.vehicleType === dataFilter)
        );
      }
    } else {
      setStatusData(dataFilter);
      let filterVehicle: DashboardInformation[] = [];

      if (vehicleData !== "Loại xe") {
        filterVehicle = initData.filter(
          (data) => data.vehicleType === vehicleData
        );
      } else {
        filterVehicle = [...initData];
      }

      if (dataFilter === "Trạng thái") setDashboardData(filterVehicle);
      else {
        setDashboardData(
          filterVehicle.filter((data) => data.status === dataFilter)
        );
      }
    }
    //Hadnle filter
  };
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  // initialize the socket
  useEffect(() => {
    const socketInstance = io("http://api.call-center-s3.kabgo.local:4502");
    setSocket(socketInstance);
  }, []);

  // get data from socket (2-way communication)
  useEffect(() => {
    if (socket) {
      console.log("Socket initialized");
      socket.on("Tracking Queue", (message: string) => {
        const data = JSON.parse(message);
        setReceivedBookingInformation(data);
      });
    }
  }, [socket]);

  useEffect(()=>{
    const getBookingByID = initData.find((el:any) => el._id === receivedBookingInformation._id);
    if(getBookingByID === undefined){
      const newObj = {
        _id: receivedBookingInformation._id,
        customer: receivedBookingInformation.customer_phonenumber,
        driver: "",
        time: receivedBookingInformation.booking_time,
        vehicleType: receivedBookingInformation.vehicle_type,
        status: receivedBookingInformation.state,
        arrivalAddress: receivedBookingInformation.destination,
      };
      if(newObj._id!==undefined){
        dispatch(dashboardActions.addDashboardInformation(newObj));
      }
    }
    else{
      dispatch(dashboardActions.updateStateInformation([initData.indexOf(getBookingByID), receivedBookingInformation.state, receivedBookingInformation.driver_phonenumber]));
    }
  }, [receivedBookingInformation])

  useEffect(() => {
    setDashboardData(initData);
  }, [initData]);

  return (
    <div className={styles["call-receipt-table"]}>
      <div className={styles["table-title"]}>
        <span>TÌNH TRẠNG CUỐC XE</span>
        <div className={styles["search-tool"]}>
          <SearchIcon className={styles["search-icn"]} />
          <input className={styles["search-input"]} placeholder="Tìm kiếm..." />
        </div>
      </div>

      <div className={styles["table-container-for-scroll"]}>
        <table className={styles["table-view"]}>
          <thead className={styles["table-heading"]}>
            <tr>
              <th className={styles["ordinal-number"]}>STT</th>
              <th className={styles["client"]}>Khách hàng</th>
              <th className={styles["driver"]}>Tài xế</th>
              <th className={styles["time"]}>
                <div className={styles["dropdown-container-table"]}>
                  <button className={styles["dropdown-title-table"]}>
                    <div id="time_title">{timeData}</div>
                    <DownIcon className={styles["dropdown-title-down"]} />
                  </button>
                  <div
                    id="hide-area"
                    className={`${styles["dropdown-content-table"]} ${styles["space-time"]}`}
                  >
                    <div
                      onClick={() => handleFilter("time_title", "Thời gian")}
                    >
                      Thời gian
                    </div>
                    <div onClick={() => handleFilter("time_title", "Mới nhất")}>
                      Mới nhất
                    </div>
                    <div onClick={() => handleFilter("time_title", "Cũ nhất")}>
                      Cũ nhất
                    </div>
                  </div>
                </div>
              </th>
              <th className={styles["vehicle-type"]}>
                <div className={styles["dropdown-container-table"]}>
                  <button className={styles["dropdown-title-table"]}>
                    <div id="vehicle_title">{vehicleData}</div>
                    <DownIcon className={styles["dropdown-title-down"]} />
                  </button>
                  <div
                    className={`${styles["dropdown-content-table"]} ${styles["space-vehicle-type"]}`}
                  >
                    <div
                      onClick={() => handleFilter("vehicle_title", "Loại xe")}
                    >
                      Loại xe
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("vehicle_title", "Xe máy")
                      }
                    >
                      Xe máy
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("vehicle_title", "Xe tay ga")
                      }
                    >
                      Xe tay ga
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("vehicle_title", "Xe Ô tô con")
                      }
                    >
                      Xe Ô tô con
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("vehicle_title", "Xe Ô tô")
                      }
                    >
                      Xe Ô tô
                    </div>
                  </div>
                </div>
              </th>
              <th className={styles["status"]}>
                <div className={styles["dropdown-container-table"]}>
                  <button className={styles["dropdown-title-table"]}>
                    <div id="status_title">{statusData}</div>
                    <DownIcon className={styles["dropdown-title-down"]} />
                  </button>
                  <div
                    className={`${styles["dropdown-content-table"]} ${styles["space-status"]}`}
                  >
                    <div
                      onClick={() => handleFilter("status_title", "Trạng thái")}
                    >
                      Trạng thái
                    </div>
                    <div
                      onClick={() => handleFilter("status_title", "Hoàn thành")}
                    >
                      Hoàn thành
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("status_title", "Đang tiến hành")
                      }
                    >
                      Đang tiến hành
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("status_title", "Đang điều phối")
                      }
                    >
                      Đang điều phối
                    </div>
                    <div onClick={() => handleFilter("status_title", "Đã hủy")}>
                      Đã hủy
                    </div>
                  </div>
                </div>
              </th>
              <th className={styles["arrival-address"]}>Điểm đến</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles["table-content"]}>
            {dashboardData.map((el, index) => (
              <tr key={index}>
                <td className={styles["ordinal-number"]}>{index + 1}</td>
                <td className={styles["client"]}>{el.customer}</td>
                <td className={styles["driver"]}>
                  {el.driver === "" ? <LoadingSpinner /> : el.driver}
                </td>
                <td className={styles["date-time"]}>{el.time}</td>
                <td
                  className={styles["vehicle-type"]}
                  style={{ textAlign: "center" }}
                >
                  {el.vehicleType}
                </td>
                <td
                  className={
                    el.status === "Hoàn thành"
                      ? `${styles["bold"]} ${styles["green-txt"]}`
                      : el.status === "Đang tiến hành"
                      ? `${styles["bold"]}  ${styles["red-txt"]}`
                      : el.status === "Đang điều phối"
                      ? `${styles["bold"]}  ${styles["yellow-txt"]}`
                      : `${styles["bold"]}  ${styles["black-txt"]}`
                  }
                >
                  {el.status}
                </td>
                <td className={styles["arrival-address"]}>
                  {el.arrivalAddress}
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
