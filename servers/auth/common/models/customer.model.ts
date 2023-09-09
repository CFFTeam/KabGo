import mongoose from 'mongoose';

export interface Customer {
    _id?: string;
    avatar?: string;
    name?: string;
    email: string;
    phonenumber?: string;
    dob?: string;
    home_address: string;
    type?: string;
    default_payment_method?: string;
    rank?: string;
    distance?: string;
    password?: string;
    active?: string;
    lock?: boolean;
}

const customerSchema = new mongoose.Schema<Customer>({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    avatar: { type: String, default: '' },
    phonenumber: { type: String, default: '' },
    dob: { type: String, default: '' },
    home_address: { type: String, default: '' },
    type: { type: String, default: 'STANDARD' },
    default_payment_method: { type: String, default: 'Tiền mặt' },
    rank: { type: String, default: 'Đồng' },
    distance: { type: String, default: '' },
    password: { type: String, default: '' },
    active: { type: String, default: '26/8/2023' },
    lock: { type: Boolean, default: false },
});

const customerModel = mongoose.model('Customer', customerSchema);

export default customerModel;

