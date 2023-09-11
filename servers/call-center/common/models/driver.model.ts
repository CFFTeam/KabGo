import mongoose from 'mongoose';
import './service.model';

export interface AccountBalance {
    name: string;
    balance: number;
}

export interface Vehicle {
    name: string;
    brand: string;
    category: string;
    color: string;
    service: mongoose.Types.ObjectId;
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
    account_balance?: AccountBalance[];
    vehicle?: Vehicle[];
    active?: string;
}

const driverSchema = new mongoose.Schema<Driver>({
    avatar: { type: String }, 
    name: { type: String },
    email: { type: String },
    phonenumber: { type: String },
    rate: { type: Number },
    accept_rate: { type: Number },
    cancel_rate: { type: Number },
    begin_day: { type: String },
    day_income: { type: Number },
    week_income: { type: Number },
    lock: { type: Boolean, default: false },
    account_balance: [{ name: String, balance: Number }],
    vehicle: [
        {
            name: String,
            brand: String,
            category: String,
            color: String,
            service: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service",
            },
            number: String,
            _id: false
        },
    ],
    active: {
        type: String,
        default: '26/8/2023',
    },
});

const driverModel = mongoose.model<Driver>('Driver', driverSchema);

export default driverModel;

