import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Coordination {
    lat: number;
    lng: number;
}

export interface BookingInformation {
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

export interface MostVisitedAddress {
    _id: any,
    address: string,
    frequency: number,
    destinationLatLng: Coordination
}

export interface MostRecentBooking {
    _id: any,
    bookingTime: string,
    departureAddress: string,
    arrivalAddress: string,
    vehicleType: string,
    originLatLng: Coordination;
    destinationLatLng: Coordination;
}


// define the type of call receipt state
interface callReceiptState {
    bookingInformation: BookingInformation,
    mostVisitedAddresses: MostVisitedAddress[],
    mostRecentBookings: MostRecentBooking[],
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
    mostRecentBookings: [],
    // mostVisitedAddress: 'Huynh Dinh hai'
}

const callReceiptSlice = createSlice({
    name: 'callReceipt',
    initialState: initialCallReceiptState,
    reducers: {
        updateBookingInformation: (state, action: PayloadAction<BookingInformation>) => {
            state.bookingInformation = action.payload;
        },
        updateMostVisitedAddressList: (state, action: PayloadAction<MostVisitedAddress[]>) => {
            state.mostVisitedAddresses = action.payload;
        },
        updateMostRecentBookingList: (state, action: PayloadAction<MostRecentBooking[]>) => {
            state.mostRecentBookings = action.payload;
        }
        // setMostVisitedAddress: (state, action: PayloadAction<string>) => {
        //     state.mostVisitedAddress = action.payload;
        // }
    },
})


export const callReceiptActions = callReceiptSlice.actions;
export default callReceiptSlice.reducer;