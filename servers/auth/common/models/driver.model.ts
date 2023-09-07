import mongoose from 'mongoose';
import './service.model';

export interface IAccountBalance {
    name: string;
    balance: number;
}

export interface IVehicle {
    name: string;
    brand: string;
    category: string;
    color: string;
    service: mongoose.Types.ObjectId;
    number: string;
}

export interface IDriver {
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
    account_balance?: IAccountBalance[];
    vehicle?: IVehicle[];
    active?: string;
    social?: boolean;
}

const driverSchema = new mongoose.Schema<IDriver>({
    avatar: { type: String }, 
    name: { type: String },
    email: { type: String },
    phonenumber: { type: String },
    rate: { type: Number, default: 0.0 },
    accept_rate: { type: Number, default: 0.0 },
    cancel_rate: { type: Number, default: 0.0 },
    begin_day: { type: String },
    day_income: { type: Number, default: 0.0 },
    week_income: { type: Number, default: 0.0 },
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
        default: Date.now(),
    },
    social: {
        type: Boolean,
        default: false,
    }
});

const Driver = mongoose.model<IDriver>('Driver', driverSchema);

export default Driver;

