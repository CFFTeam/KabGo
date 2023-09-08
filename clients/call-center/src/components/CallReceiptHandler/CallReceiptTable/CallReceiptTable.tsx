import styles from "./CallReceiptTable.module.css";
import {ReactComponent as SearchIcon} from "@assets/svg/CallReceiptHandler/search-icn.svg";
import {ReactComponent as CancelIcon} from "@assets/svg/CallReceiptHandler/cancel-icn.svg";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import io, { Socket } from 'socket.io-client';
import { useAppSelector, useAppDispatch } from "@hooks/ReduxHooks";
import { callReceiptHandlerActions } from "@store/reducers/callReceiptHandlerSlice";

interface CallReceiptData {
    _id: string,
    phoneNumber: string,
    date: string,
    time: string,
    vehicleType: string,
    status: string,
    arrivalAddress: string,
}

const CallReceiptTable: React.FC = () => {
    // const [socket, setSocket] = useState<Socket | null>(null);
    // const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const callReceiptData = useAppSelector((state) => state.callReceiptHandler.bookingInformation);
    const navigate = useNavigate();
    // useEffect(() => {
    //     const socketInstance = io('http://api.call-center-s2.kabgo.local:4501');
    //     setSocket(socketInstance);

    //     return () => {
    //         socketInstance.disconnect();
    //     };
    // }, []);

    // useEffect(() => {
    //     if (socket) {
    //         console.log('socket ne: ', socket);
    //         socket.on('queue bang socket ne', (message: string) => {
    //             console.log('message ne ', message);
    //             setReceivedMessages(prevMessages => [...prevMessages, message]);
    //         });
    //     }
    // }, [socket]);
    const handleItemClick = (id: string) => {
        navigate(`/booking-page/${id}`);
        const guestInformation = callReceiptData.find((item) => item._id === id);
        // used with google api key
        // dispatch(callReceiptHandlerActions.updateFinalBookingInformation({
        //     _id: guestInformation?._id || '',
        //     name: guestInformation?.name || '',
        //     phoneNumber: guestInformation?.phoneNumber || '',
        //     vehicleType: guestInformation?.vehicleType || '',
        //     origin: guestInformation?.origin || '',
        //     destination: guestInformation?.destination || '',
        //     note: guestInformation?.note || '',
        //     time: guestInformation?.time || '',
        //     localTime: guestInformation?.local_time || '',
        //     state: guestInformation?.state || '',   
        //     originLatLng: guestInformation?.originLatLng || {},
        //     destinationLatLng: guestInformation?.destinationLatLng || {},
        //     distance: '',
        //     duration: '',
        //     price: 0
        // }));

        // static data
        dispatch(callReceiptHandlerActions.updateFinalBookingInformation({
            _id: guestInformation?._id || '64f9ca9541b8fa780d5a2127',
            name: 'Khoa Nguyễn',
            phoneNumber: '0903861515',
            vehicleType: "Ô tô (2-4 chỗ)",
            origin: "Chung cư 24/16 Võ Oanh (Chung cư C1 cũ), Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh",
            destination: "Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM, Đường Nguyễn Văn Cừ, phường 4, Quận 5, Thành phố Hồ Chí Minh",
            note:"Gần chung ủy ban nhân dân phường 25",
            time: guestInformation?.time || '2023-09-06T10:00:00.000+00:00',
            localTime: "2023-09-06T10:00:00Z",
            state: "Chờ xử lý",
            originLatLng: {
                lat: 10.8441125, 
                lng: 106.7407742
            },
            destinationLatLng:  {
                lat: 10.7628356, 
                lng: 106.6824824
            },
            distance: '',
            duration: '',
            price: 0

        }));
    }


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
                            <tr key ={el._id} onClick = {() => handleItemClick(el._id)}>
                                <td className ={styles["client"]}>0903861515</td>
                                <td className = {styles["date-time"]}>
                                {el.time}
                                </td>
                                <td className = {styles["vehicle-type"]} style = {{textAlign: "center"}}>
                                    {el.vehicleType}
                                </td>
                                <td className = {el.state === 'Chờ xử lý' ? `${styles["bold"]} ${styles["orange-txt"]}` 
                                : el.state === "Hoàn thành" ? `${styles["bold"]} ${styles["green-txt"]}`
                                : el.state === "Hẹn giờ" ? `${styles["bold"]} ${styles["purple-txt"]}`
                                : el.state === "Hủy" ? `${styles["bold"]} ${styles["grey-txt"]}`
                                : `${styles["bold"]} ${styles["black-txt"]}`}>
                                    {el.state}
                                </td>
                                <td className = {styles["arrival-address"]}>
                                    {el.destination}
                                </td>
                                {el.state === "Chờ xử lý" ? 
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