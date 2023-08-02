import styles from "./CallReceiptTable.module.css";
import {ReactComponent as SearchIcon} from "@assets/svg/CallReceiptHandler/search-icn.svg";

const CallReceiptTable: React.FC = () => {
    return <div className={styles["call-receipt-table"]}>

        <div className={styles["table-title"]}>
            <span>
                Cuộc gọi chờ xử lý
            </span>          
            <div className={styles["search-tool"]}>
                <SearchIcon className = {styles["search-icn"]}/>
                <input className={styles["search-input"]} placeholder = "Tìm kiếm..."/> 
            </div>
        </div>

        <table className={styles["table-view"]}>
                <thead className = {styles["table-heading"]}>
                    <tr>
                        <th className = {styles["client"]}>Khách hàng</th>
                        <th className = {styles["time"]}>
                            <select>
                                <option value = "Thời gian">
                                    Thời gian
                                </option>
                                <option value = "Mới nhất">
                                    Mới nhất
                                </option>
                                <option value = "Cũ nhất">
                                    Cũ nhất
                                </option>
                            </select>
                        </th>
                        <th className = {styles["vehicle-type"]}>
                            <select>
                                <option value = "Loại xe đặt">
                                    Loại xe đặt
                                </option>
                                <option value = "Ô tô (7-9 chỗ)">
                                    Ô tô (7-9 chỗ)
                                </option>
                                <option value = "Ô tô (2-4 chỗ)">
                                    Ô tô (2-4 chỗ)
                                </option>
                                <option value = "Xe máy (1 chỗ)">
                                    Xe máy (1 chỗ)
                                </option>
                                <option value = "Xe tay ga (1 chỗ)">
                                    Xe tay ga (1 chỗ)
                                </option>
                            </select>
                        </th>
                        <th className = {styles["status"]}>
                            <select>
                                <option value = "Trạng thái">
                                    Trạng thái
                                </option>
                                <option value = "Chờ xử lý">
                                    Chờ xử lý
                                </option>
                                <option value = "Đã hủy">
                                    Đã hủy
                                </option>
                            </select>
                        </th>
                        <th className = {styles["arrival-address"]}>
                            Điểm đến
                        </th>
                        <th></th>
                    </tr>
                </thead>     
                <tbody className = {styles["table-content"]}>
                    <td className ={styles["client"]}>0903861515</td>
                    <td className = {styles["date-time"]}>
                        07:30 - 31/7/2023
                        {/* <span className={styles["departure-time"]}>
                            07:30 
                        </span>
                        <span className={styles["date"]}>
                            31/7/2023
                        </span> */}
                    </td>
                    <td className = {styles["vehicle-type"]} style = {{textAlign: "center"}}>
                        Ô tô (7-9 chỗ)
                    </td>
                    <td className = {styles["status"]}>
                        Chờ xử lý
                    </td>
                    <td className = {styles["arrival-address"]}>
                        45 Trần Hưng Đạo, quận 5, TP. Hồ Chí Minh
                    </td>
                    <td className = {styles["button"]}>
                        Delete button
                    </td>
                </tbody>           
        </table>
    </div>
}

export default CallReceiptTable;