import React from "react";
import {useState} from 'react';
import styles from "./MostVisitedAddressForm.module.css";
import {ReactComponent as LocationIcon} from "@assets/svg/CallReceipt/location.svg";
import {useAppDispatch, useAppSelector} from "@hooks/ReduxHooks";
import {callReceiptActions} from "@store/reducers/callReceiptSlice";

interface MostVisitedAddressList {
    address: String,
    frequency: number
}

const mostVisitedAddresses: MostVisitedAddressList[] = [
    {
        address: '22/16 Huỳnh Đình Hai, phường 24, quận Bình Thạnh',
        frequency: 10
    },
    {
        address: '24/18 Huỳnh Đình Hai, phường 24, quận Bình Thạnh',
        frequency: 3
    },
    {
        address: '22/19 Huỳnh Đình Hai, phường 24, quận Bình Thạnh',
        frequency: 2
    },
    {
        address: '22/18 Huỳnh Đình Hai, phường 24, quận Bình Thạnh',
        frequency: 10
    },
    {
        address: '22/35 Huỳnh Đình Hai, phường 24, quận Bình Thạnh',
        frequency: 6
    },
]

const MostVisitedAddressForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const bookingInformation = useAppSelector((state) => state.callReceipt.bookingInformation);
    const [stringTestingRedux, setStringTestingRedux] = useState<string>('');

    console.log('bookingInformation: ', bookingInformation);
    const handleRowClick = (): void  => {
        console.log('clicking detected');
        dispatch(callReceiptActions.updateBookingInformation({
            name: '',
            phoneNumber: '',
            carType: '',
            scheduledBookingTime: '',
            departureAddress: "Khoa bin nef",
            arrivalAddress: '',
            note: '',
        }))
    }


    return <form className={styles["most-visited-address-form"]}>
        <div className={styles["form-heading"]}>
            <span className={styles["title"]}>
                Địa chỉ đi nhiều nhất
            </span>
            
        </div>
        <table className={styles["table-list"]}>
            <thead className = {styles["table-heading"]}>
                <tr>
                    <th>
                        <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <span style = {{lineHeight: "1em", fontSize: "1.8rem"}}>
                                Địa chỉ
                            </span>
                            <span className={styles["address-icn"]}>
                                <LocationIcon style = {{fontSize: "2.4rem", marginLeft: "1rem"}}/>
                            </span>
                        </div>
                    </th>  
                    <th style = {{fontSize: "1.8rem"}}>Lượt đi</th>
                </tr>
            </thead>
            <tbody>
                {
                    mostVisitedAddresses.map((el, index) => 
                        <tr style = {{backgroundColor: "#FBF9FA", cursor: "pointer"}} onClick = {handleRowClick} key = {index}>
                            <td>
                                <div style = {{display: "flex", gap: "1rem", marginTop: '0.3rem'}}>
                                    <span>
                                        <LocationIcon style = {{fontSize: "2rem"}}/>
                                    </span>
                                    <span style = {{fontSize: "1.6rem", display: "inline-block", maxWidth: "50rem"}}>
                                        {el.address}
                                    </span>
                                </div>
                            </td>
                        <td style = {{fontSize: "1.7rem", color: "#F86C1D", fontWeight: "600"}}>{el.frequency} lần</td>
                        </tr>
                    )
                }
            </tbody>    
        </table>
        
    </form>
}

export default MostVisitedAddressForm;