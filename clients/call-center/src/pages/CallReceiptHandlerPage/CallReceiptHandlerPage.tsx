import styles from "./CallReceiptHandlerPage.module.css";
import CallReceiptTable from "@components/CallReceiptHandler/CallReceiptTable/CallReceiptTable";
import {useState, useEffect} from "react";
import io, {Socket} from "socket.io-client";
import { useAppDispatch, useAppSelector } from "@hooks/ReduxHooks";
import {callReceiptHandlerActions} from "../../store/reducers/callReceiptHandlerSlice";
import { Coordination, BookingInformation } from "../../store/reducers/callReceiptHandlerSlice";


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

type SocketIO = Socket | null;


const CallReceiptHandlerPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const bookingInformation = useAppSelector((state) => state.callReceiptHandler.bookingInformation);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [receivedBookingInformation, setReceivedBookingInformation] = useState<BookingInformation | any>(null);

    // initialize the socket
    useEffect(() => {
        const socketInstance = io('http://api.call-center-s2.kabgo.local:4501');
        setSocket(socketInstance);
    }, [])
    // get data from socket (2-way communication)
    useEffect(() => {
        if (socket) {
            console.log('socket initialized');
            socket.on('locating', (message: string) => {
                dispatch(callReceiptHandlerActions.setSocket(socket as SocketIO));
                console.log('message ne: ', message);
                const data = JSON.parse(message);
                console.log('my data: ', data);
                const receivedBookingInformation = {
                    _id: data?._id,
                    name: data?.customer_name,
                    phoneNumber: data?.customer_phonenumber,
                    vehicleType: data?.vehicle_type,
                    origin: data?.origin,
                    destination: data?.destination,
                    note: data?.note,
                    time: data?.time,
                    localTime: data?.local_time,
                    bookingTime: data?.booking_time,
                    scheduledBookingTime_HH: data?.scheduledBookingTime_HH,
                    scheduledBookingTime_MM: data?.scheduledBookingTime_MM,
                    state: data?.state,
                    originLatLng: data?.origin_latlng,
                    destinationLatLng: data?.destination_latlng
                }
                setReceivedBookingInformation(receivedBookingInformation);
            })
        }
    }, [socket]);

    useEffect(() => {
        if (receivedBookingInformation) {
            dispatch(callReceiptHandlerActions.updateBookingInformation([receivedBookingInformation, ...bookingInformation]));
        }
    }, [receivedBookingInformation])

    return <div className={styles["main-content"]}>
        <CallReceiptTable/>
    </div>
}

export default CallReceiptHandlerPage;


// setReceivedMessages(receivedMessage);
// const formData: BookingInformation = {
//     name: nameRef.current?.value || '',
//     phoneNumber: phoneNumberRef.current?.value || '',
//     vehicleType: vehicleTypeRef.current?.value || '',
//     scheduledBookingTime_HH: scheduledBookingTime_HH_Ref.current?.value || '',
//     scheduledBookingTime_MM: scheduledBookingTime_MM_Ref.current?.value || '',
//     departureAddress: bookingInformation.departureAddress || '', // must not be empty (set from PlacesAutocompleteInput)
//     arrivalAddress: bookingInformation.arrivalAddress || '',  // must not be empty (set from PlacesAutocompleteInput)
//     note: noteRef.current?.value || '',
// }
