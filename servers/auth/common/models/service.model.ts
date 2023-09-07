import mongoose from "mongoose";

export interface IService {
	_id?: string;
	name?: string;
	description?: string;
	price?: number;
}

const serviceSchema = new mongoose.Schema<IService>({
	name: { type: String },
	description: { type: String },
	price: { type: Number },
});


const serviceModel = mongoose.model<IService>("Service", serviceSchema);

export default serviceModel;