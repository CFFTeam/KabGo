import styles from "./Dashboard.module.css";
import { ReactComponent as SearchIcon } from "@assets/svg/CallReceiptHandler/search-icn.svg";
import { ReactComponent as DownIcon } from "@assets/svg/Dashboard/down.svg";
import $ from "jquery";
import { useState } from "react";

interface DashboardData {
  id: string;
  client: string;
  driver: string;
  date: string;
  time: string;
  vehicleType: string;
  status: string;
  arrivalAddress: string;
}

const DashboardTable: React.FC = () => {
  const initData: DashboardData[] = [
    {
      id: "1",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Hoàn thành",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
    {
      id: "2",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Đã hủy",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
    {
      id: "3",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Đang điều phối",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
    {
      id: "4",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Đang tiến hành",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
    {
      id: "5",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Hoàn thành",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
    {
      id: "6",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Đã hủy",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
    {
      id: "3",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Đang điều phối",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
    {
      id: "4",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Đang tiến hành",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
    {
      id: "5",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Hoàn thành",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
    {
      id: "6",
      client: "Cải Xanh",
      driver: "Culi chạy xe",
      date: "31/7/2023",
      time: "07:30 AM",
      vehicleType: "Ô tô (7-9 chỗ)",
      status: "Đã hủy",
      arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    },
  ];
  const [dashboardData, setDashboardData] = useState<DashboardData[]>(initData);
  const [timeData, setTimeData] = useState<string>("Thời gian");
  const [vehicleData, setVehicleData] = useState<string>("Loại xe khách đặt");
  const [statusData, setStatusData] = useState<string>("Trạng thái");
  const handleFilter = (id: string, dataFilter: string) => {
    // $(`#${id}`).text(dataFilter);
    if (id === "time_title") {
      setTimeData(dataFilter);
    } else if (id === "vehicle_title") {
      setVehicleData(dataFilter);
      let filterStatus: DashboardData[] = [];

      if (statusData !== "Trạng thái"){
        filterStatus = initData.filter((data) => data.status === statusData);
      }
      else {
        filterStatus = [...initData];
      }
      if (dataFilter === "Loại xe khách đặt") setDashboardData(filterStatus);
      else {
        setDashboardData(
          filterStatus.filter((data) => data.vehicleType === dataFilter)
        );
      }
    } else {
      setStatusData(dataFilter);
      let filterVehicle: DashboardData[] = [];

      if (vehicleData !== "Loại xe khách đặt"){ 
        filterVehicle = initData.filter((data) => data.vehicleType === vehicleData)
      }
      else {
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
                      onClick={() =>
                        handleFilter("vehicle_title", "Loại xe khách đặt")
                      }
                    >
                      Loại xe khách đặt
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("vehicle_title", "Ô tô (7-9 chỗ)")
                      }
                    >
                      Ô tô (7-9 chỗ)
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("vehicle_title", "Ô tô (2-4 chỗ)")
                      }
                    >
                      Ô tô (2-4 chỗ)
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("vehicle_title", "Xe máy (1 chỗ)")
                      }
                    >
                      Xe máy (1 chỗ)
                    </div>
                    <div
                      onClick={() =>
                        handleFilter("vehicle_title", "Xe tay ga (1 chỗ)")
                      }
                    >
                      Xe tay ga (1 chỗ)
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
                <td className={styles["ordinal-number"]}>{el.id}</td>
                <td className={styles["client"]}>{el.client}</td>
                <td className={styles["driver"]}>{el.driver}</td>
                <td className={styles["date-time"]}>
                  {el.time} - {el.date}
                </td>
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
