import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Coordination {
    lat: number;
    lng: number;
}

interface BookingInformation {
    name: string,
    phoneNumber: string,
    vehicleType: string,
    scheduledBookingTime_HH: string,
    scheduledBookingTime_MM: string,
    departureAddress: string,
    arrivalAddress: string,
    note: string,
    originLatLng: Coordination;
    destinationLatLng: Coordination;
}

interface MostVisitedAddressList {
    address: string,
    frequency: number
}

interface LatestBookingData {
    bookingTime: string,
    departureAddress: string,
    arrivalAddress: string,
    vehicleType: string,
}


// define the type of call receipt state
interface callReceiptState {
    bookingInformation: BookingInformation,
    mostVisitedAddresses: MostVisitedAddressList[],
    latestBookingData: LatestBookingData[],
    // mostVisitedAddress: string,
}


const initialCallReceiptState: callReceiptState = {
    bookingInformation: {
        name: '',
        phoneNumber: '',
        vehicleType: '',
        scheduledBookingTime_HH: '',
        scheduledBookingTime_MM: '',
        departureAddress: '',
        arrivalAddress: '',
        note: '',
        originLatLng: {
            lat: 0,
            lng: 0
        },
        destinationLatLng: {
            lat: 0,
            lng: 0
        }
    },
    mostVisitedAddresses: [],
    latestBookingData: [],
    // mostVisitedAddress: 'Huynh Dinh hai'
}

const callReceiptSlice = createSlice({
    name: 'callReceipt',
    initialState: initialCallReceiptState,
    reducers: {
        updateBookingInformation: (state, action: PayloadAction<BookingInformation>) => {
            state.bookingInformation = action.payload;
        },
        // setMostVisitedAddress: (state, action: PayloadAction<string>) => {
        //     state.mostVisitedAddress = action.payload;
        // }
    },
})


export const callReceiptActions = callReceiptSlice.actions;
export default callReceiptSlice.reducer;