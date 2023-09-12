import mongoose from 'mongoose';

export interface Coupon {
    _id?: string;
    name?: string;
    rank: string;
    value: number;
    time_range?: string;
}

const couponSchema = new mongoose.Schema<Coupon>({
    name: { type: String },
    rank: { type: String },
    value: { type: Number },
    time_range: { type: String },
});

const couponModel = mongoose.model('Coupon', couponSchema);

export default couponModel;

