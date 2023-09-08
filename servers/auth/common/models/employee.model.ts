import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

export interface Employee {
	_id?: string;
	name?: string;
	email: string;
    password: string;
	phonenumber?: string;
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
	phonenumber: { type: String },
    password: {
        type: String,
        minlength: 8,
    },
	dob: { type: String },
    address: { type: String },
	role: { type: String },
	active: {type: String, default: "26/8/2023" },
	lock: {type: Boolean, default: false },
	gender: {type: String}
});


const employeeModel = mongoose.model("Employee", employeeSchema);

employeeSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

export default employeeModel;