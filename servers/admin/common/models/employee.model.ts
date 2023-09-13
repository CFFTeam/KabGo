import mongoose from "mongoose";

export interface Employee {
	_id?: string;
	name?: string;
	email: string;
	phoneNumber?: string;
    dob?: string;
	address: string;
	role?: string;
	active?: string;
	lock?: boolean;
	gender?: string;
}

const employeeSchema = new mongoose.Schema<Employee>({
	name: { type: String },
	email: { type: String },
	phoneNumber: { type: String },
	dob: { type: String },
    address: { type: String },
	role: { type: String },
	active: {type: String, default: "26/8/2023" },
	lock: {type: Boolean, default: false },
	gender: {type: String}
});


const employeeModel = mongoose.model("employees", employeeSchema);

export default employeeModel;