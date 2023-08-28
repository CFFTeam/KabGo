import mongoose from "mongoose";

export interface Employee {
	_id?: string;
	name?: string;
	email: string;
	phonenumber?: string;
    dob?: string;
	address: string;
	role?: string;
	active?: string;
	lock?: boolean;
}

const employeeSchema = new mongoose.Schema<Employee>({
	name: { type: String },
	email: { type: String },
	phonenumber: { type: String },
	dob: { type: String },
    address: { type: String },
	role: { type: String },
	active: {type: String, default: "26/8/2023" },
	lock: {type: Boolean, default: false },
});


const employeeModel = mongoose.model("employees", employeeSchema);

export default employeeModel;