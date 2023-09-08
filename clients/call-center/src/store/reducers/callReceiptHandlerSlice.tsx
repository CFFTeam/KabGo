import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { Stringifiable } from 'query-string';
import { Socket } from 'socket.io-client';

export interface ProcessSteps {
    stepOne: boolean,
    stepTwo: boolean,
    stepThree: boolean,
    stepFour: boolean
}

export interface Coordination {
    lat: number;
    lng: number;
}
    // name: nameRef.current?.value || '',
    // phoneNumber: phoneNumberRef.current?.value || '',
    // vehicleType: vehicleTypeRef.current?.value || '',
    // scheduledBookingTime_HH: scheduledBookingTime_HH_Ref.current?.value || '',
    // scheduledBookingTime_MM: scheduledBookingTime_MM_Ref.current?.value || '',
    // departureAddress: bookingInformation.departureAddress || '', // must not be empty (set from PlacesAutocompleteInput)
    // arrivalAddress: bookingInformation.arrivalAddress || '',  // must not be empty (set from PlacesAutocompleteInput)
    // note: noteRef.current?.value || '',


export interface FinalBookingInformation {
    _id: string | any;
    name: string;
    phoneNumber: string;
    vehicleType: string;
    origin: string; // departure address
    destination: string; // arrival address
    note: string;
    time: string;
    localTime: Date | string;
    state: string;
    originLatLng: Coordination | any;
    destinationLatLng: Coordination | any;
    distance: string;
    duration: string;
    price: string | number;
}

export interface BookingInformation {
    _id: string | any;
    name: string;
    phoneNumber: string;
    vehicleType: string;
    origin: string;
    destination: string;
    note: string;
    time: string;
    localTime: Date | string;
    state: string;
    originLatLng: Coordination;
    destinationLatLng: Coordination;
}


export interface callReceiptHandlerState {
    processSteps: ProcessSteps,
    bookingInformation: BookingInformation[],
    finalBookingInformation: FinalBookingInformation,
    socketInstance: SocketIO | any;
}

type SocketIO = Socket | null;



const initialCallReceiptHandlerState: callReceiptHandlerState = {
    processSteps: {
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        stepFour: false
    },
    bookingInformation: [],
    finalBookingInformation: {
        _id: '',
        name: '',
        phoneNumber: '',
        vehicleType: '',
        origin: '',
        destination: '',
        note: '',
        time: '',
        localTime: '',
        state: '',
        originLatLng: {
            lat: 0,
            lng: 0
        },
        destinationLatLng: {
            lat: 0,
            lng: 0
        },
        distance: '',
        duration: '',
        price: 0
    },
    socketInstance: null
}

const callReceiptHandlerSlice = createSlice({
    name: 'callReceiptHandler',
    initialState: initialCallReceiptHandlerState,
    reducers: {
        updateProcessSteps: (state, action: PayloadAction<ProcessSteps>) => {
            state.processSteps = action.payload;
        },  
        updateBookingInformation: (state, action: PayloadAction<BookingInformation[]>) => {
            state.bookingInformation = action.payload;
        },
        updateFinalBookingInformation: (state, action: PayloadAction<FinalBookingInformation>) => {
            state.finalBookingInformation = action.payload
        },
        setSocket(state, action: PayloadAction<SocketIO>) {
            state.socketInstance = action.payload
        }
    }
})


export const callReceiptHandlerActions = callReceiptHandlerSlice.actions;
export default callReceiptHandlerSlice.reducer;