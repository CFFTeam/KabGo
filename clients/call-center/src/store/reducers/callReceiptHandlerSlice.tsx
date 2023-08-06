import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface OriginLatLng {
    lat: number;
    lng: number;
}

interface DestinationLatLng {
    lat: number;
    lng: number;
}

interface callReceiptHandlerState {
    originLatLng: OriginLatLng,
    destinationLatLng: DestinationLatLng
}


const initialCallReceiptHandlerState: callReceiptHandlerState = {
    originLatLng: {
        lat: 0,
        lng: 0
    },
    destinationLatLng: {
        lat: 0,
        lng: 0
    }
}

const callReceiptHandlerSlice = createSlice({
    name: 'callReceiptHandler',
    initialState: initialCallReceiptHandlerState,
    reducers: {
        updateOriginGeolocation: (state, action: PayloadAction<OriginLatLng>) => {
            state.originLatLng = action.payload
        },
        updateDestinationGeolocation: (state, action: PayloadAction<DestinationLatLng>) => {
            state.destinationLatLng = action.payload
        }
    }
})


export const callReceiptHandlerActions = callReceiptHandlerSlice.actions;
export default callReceiptHandlerSlice.reducer;