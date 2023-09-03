import mongoose from "mongoose";

export interface Service {
	_id?: string;
	name?: string;
	description?: string;
	price?: number;
}

const serviceSchema = new mongoose.Schema<Service>({
	name: { type: String },
	description: { type: String },
	price: { type: Number },
});


const serviceModel = mongoose.model("Service", serviceSchema);

export default serviceModel;