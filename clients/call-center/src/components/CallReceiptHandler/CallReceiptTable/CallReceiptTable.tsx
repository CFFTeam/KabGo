import styles from "./CallReceiptTable.module.css";
import {ReactComponent as SearchIcon} from "@assets/svg/CallReceiptHandler/search-icn.svg";
import {ReactComponent as CancelIcon} from "@assets/svg/CallReceiptHandler/cancel-icn.svg";

interface CallReceiptData {
    id: string,
    phoneNumber: string,
    date: string,
    time: string,
    vehicleType: string,
    status: string,
    arrivalAddress: string,
}

const callReceiptData: CallReceiptData[] = [
    {   
        id: '1',
        phoneNumber: "090386151",
        date: "31/7/2023",
        time: "07:30 AM",
        vehicleType: "Ô tô (7-9 chỗ)",
        status: "Chờ xử lý",
        arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    }, 
    {   
        id: '2',
        phoneNumber: "090386151",
        date: "31/7/2023",
        time: "07:30 AM",
        vehicleType: "Ô tô (7-9 chỗ)",
        status: "Đã hủy",
        arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    }, 
    {   
        id: '3',
        phoneNumber: "090386151",
        date: "31/7/2023",
        time: "07:30 AM",
        vehicleType: "Ô tô (7-9 chỗ)",
        status: "Chờ xử lý",
        arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    }, 
    {   
        id: '4',
        phoneNumber: "090386151",
        date: "31/7/2023",
        time: "07:30 AM",
        vehicleType: "Ô tô (7-9 chỗ)",
        status: "Đã hủy",
        arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    }, 
    {   
        id: '5',
        phoneNumber: "090386151",
        date: "31/7/2023",
        time: "07:30 AM",
        vehicleType: "Ô tô (7-9 chỗ)",
        status: "Chờ xử lý",
        arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    }, 
    {   
        id: '6',
        phoneNumber: "090386151",
        date: "31/7/2023",
        time: "07:30 AM",
        vehicleType: "Ô tô (7-9 chỗ)",
        status: "Đã hủy",
        arrivalAddress: "45 Trần Hưng Đạo, Q.5, TP. Hồ Chí Minh",
    }, 
]

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
                                    Loại xe khách đặt
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
                    {/* <tr>
                        <td className ={styles["client"]}>0903861515</td>
                        <td className = {styles["date-time"]}>
                        07:30 - 31/7/2023
                        </td>
                        <td className = {styles["vehicle-type"]} style = {{textAlign: "center"}}>
                            Ô tô (7-9 chỗ)
                        </td>
                        <td className = {`${styles["status"]} ${styles["bold"]} ${styles["orange-txt"]}`}>
                            Chờ xử lý
                        </td>
                        <td className = {styles["arrival-address"]}>
                            45 Trần Hưng Đạo, quận 5, TP. Hồ Chí Minh
                        </td>
                        <td className = {styles["button"]}>
                            <button className={styles["cancel-btn"]}>
                                <CancelIcon className = {styles["cancel-icn"]} />
                            </button>
                        </td>
                    </tr> */}
                    {
                        callReceiptData.map((el, index) => 
                            <tr key ={el.id}>
                                <td className ={styles["client"]}>0903861515</td>
                                <td className = {styles["date-time"]}>
                                {el.time} - {el.date}
                                </td>
                                <td className = {styles["vehicle-type"]} style = {{textAlign: "center"}}>
                                    {el.vehicleType}
                                </td>
                                <td className = {el.status === 'Chờ xử lý' ? `${styles["bold"]} ${styles["orange-txt"]}` : `${styles["bold"]} ${styles["black-txt"]}`}>
                                    {el.status}
                                </td>
                                <td className = {styles["arrival-address"]}>
                                    45 Trần Hưng Đạo, quận 5, TP. Hồ Chí Minh
                                </td>
                                {el.status === "Chờ xử lý" ? 
                                 <td className = {styles["button"]}>
                                    <button className={styles["cancel-btn"]}>
                                        <CancelIcon className = {styles["cancel-icn"]} />
                                    </button>
                                 </td> : <td></td>
                                }
                               
                        </tr>
                        )
                    }
                </tbody>           
        </table>
    </div>
}

export default CallReceiptTable;