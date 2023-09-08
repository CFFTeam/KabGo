import styles from "./BookingPage.module.css";
import GuestInfo from "@components/CallReceiptHandler/BookingForm/GuestInfo/GuestInfo";
import PlaceInfo from "@components/CallReceiptHandler/BookingForm/PlaceInfo/PlaceInfo"; 
import ConfirmInfo from "@components/CallReceiptHandler/BookingForm/ConfirmInfo/ConfirmInfo";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import { useState, useEffect } from "react";
import { callReceiptHandlerActions } from "@store/reducers/callReceiptHandlerSlice";
import { Coordination, BookingInformation } from "@store/reducers/callReceiptHandlerSlice";

// interface Coordination {
//     lat: number;
//     lng: number;
// }

// interface BookingInformation {
//     name: string;
//     phoneNumber: string;
//     vehicleType: string;
//     origin: string;
//     destination: string;
//     note: string;
//     time: string;
//     state: string;
//     originLatLng: Coordination;
//     destinationLatLng: Coordination;
// }

const BookingPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const processSteps = useAppSelector((state) => state.callReceiptHandler.processSteps);
    const socketIO = useAppSelector((state) => state.callReceiptHandler.socketInstance);
    const bookingInformation = useAppSelector((state) => state.callReceiptHandler.bookingInformation)
    const [receivedBookingInformation, setReceivedBookingInformation] = useState<BookingInformation | any>(null);

    useEffect(() => {
        if (socketIO) {
            console.log('socket initialized');
            socketIO.on('locating', (message: string) => {
                console.log('message ne: ', message);
                const data = JSON.parse(message);
                console.log('my data: ', data);
                const receivedBookingInformation = {
                    name: data.customer_name,
                    phoneNumber: data.customer_phonenumber,
                    vehicleType: data.vehicle_type,
                    origin: data.origin,
                    destination: data.destination,
                    note: data.note,
                    time: data.time,
                    state: data.state,
                    originLatLng: data.origin_latlng,
                    destinationLatLng: data.destination_latlng
                }
                setReceivedBookingInformation(receivedBookingInformation);
            })
        }
    }, [socketIO]);

    useEffect(() => {
        if (receivedBookingInformation) {
            dispatch(callReceiptHandlerActions.updateBookingInformation([receivedBookingInformation, ...bookingInformation]));
        }
    }, [receivedBookingInformation])

    return <div className={styles["main-content"]}>
        {processSteps.stepOne && <GuestInfo/>}
        {processSteps.stepTwo &&  <PlaceInfo/>}   
        {processSteps.stepThree && <ConfirmInfo/>}
        <br />
        <br />
        <br />
        <br />
    </div>
}

export default BookingPage;