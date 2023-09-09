import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Model, Schema, model } from 'mongoose';
import { Request, Response, NextFunction } from "express";

export interface IEmployee {
	_id?: string;
	name?: string;
	email: string;
    password: string;
	passwordConfirm?: string | undefined;
	phoneNumber?: string;
    dob?: string;
    address: string;
    role?: string;
    active?: string;
    lock?: boolean;
    gender?: string;
}

interface IEmployeeMethods {
	correctPassword: any;
}

// Create a new Model type that knows about IUserMethods...
type EmployeeModel = Model<IEmployee, {}, IEmployeeMethods>;

const employeeSchema = new mongoose.Schema<IEmployee, EmployeeModel, IEmployeeMethods>({
	name: { type: String },
	email: { type: String },
	phoneNumber: { type: String },
    password: {
        type: String,
        minlength: 8,
		select: false,
    },
	passwordConfirm: {
		type: String,
        minlength: 8,
		select: false,
	  },
	dob: { type: String },
    address: { type: String },
    role: { type: String },
    active: { type: String, default: '26/8/2023' },
    lock: { type: Boolean, default: false },
    gender: { type: String },
});



employeeSchema.pre('save', async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified('password')) return next();
	// Hash password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);
	// Delete password confirm field
	this.passwordConfirm = undefined;
	next();
  });

employeeSchema.methods.correctPassword = async function (candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const employeeModel = mongoose.model("Employee", employeeSchema);

export default employeeModel;
