import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface DashboardInformation {
    customer: string,
    driver: string,
    time: string,
    vehicleType: string,
    status: string,
    arrivalAddress: string,
}

const initialDashboardInformation: DashboardInformation[] = []

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialDashboardInformation,
    reducers: {
        addDashboardInformation: (state, action: PayloadAction<DashboardInformation>) => {
            // state.push(action.payload);
            return [action.payload, ...state]; 
        },

        updateStateInformation: (state, action: PayloadAction<any[]>) => {
            state[action.payload[0]].status = action.payload[1];
            state[action.payload[0]].driver = action.payload[2];
        },
    },
})


export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;