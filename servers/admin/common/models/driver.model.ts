import mongoose from 'mongoose';

export interface AccountBalance {
    name: string;
    balance: number;
}

export interface Vehicle {
    name: string;
    brand: string;
    type: string;
    color: string;
    service: string;
    number: string;
}

export interface Driver {
    _id?: string;
    avatar?: string;
    name?: string;
    email: string;
    phonenumber?: string;
    rate?: number;
    accept_rate?: number;
    cancel_rate?: number;
    begin_day?: string;
    day_income?: number;
    week_income?: number;
    lock: boolean;
    active?: string;
    account_balance?: AccountBalance[];
    vehicle?: Vehicle[];
}

const driverSchema = new mongoose.Schema<Driver>({
    name: { type: String },
    email: { type: String },
    phonenumber: { type: String },
    rate: { type: Number },
    accept_rate: { type: Number },
    cancel_rate: { type: Number },
    begin_day: { type: String },
    day_income: { type: Number },
    week_income: { type: Number },
    account_balance: [{ name: String, balance: Number }],
    vehicle: [{ name: String, brand: String, type: String, color: String, service: String, number: String }],
    active: { type: String, default: '26/8/2023' },
    lock: { type: Boolean, default: false },
});

const driverModel = mongoose.model('drivers', driverSchema);

export default driverModel;

