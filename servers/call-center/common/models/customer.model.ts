import mongoose from "mongoose";

export interface Customer {
	_id?: string;
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
	name: { type: String },
	email: { type: String },
	phonenumber: { type: String },
	dob: { type: String },
    home_address: { type: String },
	type: { type: String, default: "STANDARD" },
    default_payment_method: { type: String },
    rank: { type: String, default: "Đồng" },
    distance: { type: String },
    password: { type: String },
	active: {type: String, default: "26/8/2023" },
	lock: {type: Boolean, default: false },
});


const customerModel = mongoose.model("Customer", customerSchema);

export default customerModel;