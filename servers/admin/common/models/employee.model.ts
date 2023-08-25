import mongoose from "mongoose";

export interface Employee {
	_id?: string;
	name?: string;
	email: string;
	phonenumber?: string;
    dob?: string;
	address: string;
	role?: string;
}

const employeeSchema = new mongoose.Schema<Employee>({
	name: { type: String },
	email: { type: String },
	phonenumber: { type: String },
	dob: { type: String },
    address: { type: String },
	role: { type: String },
});


const employeeModel = mongoose.model("employees", employeeSchema);

export default employeeModel;