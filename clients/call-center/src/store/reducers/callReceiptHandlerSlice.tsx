import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface ProcessSteps {
    stepOne: boolean,
    stepTwo: boolean,
    stepThree: boolean,
    stepFour: boolean
}

interface OriginLatLng {
    lat: number;
    lng: number;
}

interface DestinationLatLng {
    lat: number;
    lng: number;
}

interface BookingAddress {
    origin: string;
    destination: string;
}


interface callReceiptHandlerState {
    processSteps: ProcessSteps,
    originLatLng: OriginLatLng,
    destinationLatLng: DestinationLatLng,
    bookingAddress: BookingAddress
}



const initialCallReceiptHandlerState: callReceiptHandlerState = {
    processSteps: {
        stepOne: true,
        stepTwo: false,
        stepThree: false,
        stepFour: false
    },

    originLatLng: {
        lat: 0,
        lng: 0
    },

    destinationLatLng: {
        lat: 0,
        lng: 0
    },

    bookingAddress: {
        origin: '',
        destination: ''
    }
}

const callReceiptHandlerSlice = createSlice({
    name: 'callReceiptHandler',
    initialState: initialCallReceiptHandlerState,
    reducers: {
        updateProcessSteps: (state, action: PayloadAction<ProcessSteps>) => {
            state.processSteps = action.payload;
        },  

        updateOriginGeolocation: (state, action: PayloadAction<OriginLatLng>) => {
            state.originLatLng = action.payload
        },

        updateDestinationGeolocation: (state, action: PayloadAction<DestinationLatLng>) => {
            state.destinationLatLng = action.payload
        },

        updateBookingAddress: (state, action: PayloadAction<BookingAddress>) => {
            state.bookingAddress = action.payload
        }
    }
})


export const callReceiptHandlerActions = callReceiptHandlerSlice.actions;
export default callReceiptHandlerSlice.reducer;