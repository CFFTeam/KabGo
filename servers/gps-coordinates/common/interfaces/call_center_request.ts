
export interface CallCenterRequest {
    _id: string,
    customer_name: string,
    customer_phonenumber: string,
    vehicle_type: string,
    origin: string,
    destination: string,
    note: string,
    time: string,
    local_time: string,
    state: string,
    origin_latlng: {
        lat: number,
        lng: number
    },
    destination_latlng: {
        lat: number,
        lng: number
    }
}