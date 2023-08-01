import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface BookingInformation {
    name: String,
    phoneNumber: String,
    carType: String,
    scheduledBookingTime: String,
    departureAddress: String,
    arrivalAddress: String,
    note: String,
}

interface MostVisitedAddressList {
    address: String,
    frequency: number
}

interface LatestBookingData {
    bookingTime: String,
    departureAddress: String,
    arrivalAddress: String,
    vehicleType: String,
}

interface callReceiptState {
    bookingInformation: BookingInformation,
    mostVisitedAddresses: MostVisitedAddressList[],
    latestBookingData: LatestBookingData[],
}

const initialCallReceiptState: callReceiptState = {
    bookingInformation: {
        name: '',
        phoneNumber: '',
        carType: '',
        scheduledBookingTime: '',
        departureAddress: '',
        arrivalAddress: '',
        note: '',
    },
    mostVisitedAddresses: [],
    latestBookingData: [],
}

const callReceiptSlice = createSlice({
    name: 'callReceipt',
    initialState: initialCallReceiptState,
    reducers: {
        updateBookingInformation: (state, action: PayloadAction<BookingInformation>) => {
            state.bookingInformation = action.payload;
        },
    },
})


export const callReceiptActions = callReceiptSlice.actions;
export default callReceiptSlice.reducer;