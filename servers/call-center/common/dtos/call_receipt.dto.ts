import { IsString, IsNotEmpty } from "class-validator";

class CallReceiptDto {
	constructor(obj: any) {
		Object.assign(this, obj);
	}
	@IsNotEmpty({ message: "name is required" })
	@IsString({ message: "name must be a string" })
	public customer_name: string | any;

	@IsNotEmpty({ message: "phone number is required" })
	@IsString({ message: "phone number must be a string" })
	public customer_phonenumber: string | any;

    @IsNotEmpty({ message: "vehicle type is required" })
	@IsString({ message: "vehicle type must be a string" })
	public vehicle_type: string | any;

    @IsNotEmpty({ message: "original address is required" })
	@IsString({ message: "original address must be a string" })
	public origin: string | any;

    @IsNotEmpty({ message: "destination address is required" })
	@IsString({ message: "destination address must be a string" })
	public destination: string | any;
}

export default CallReceiptDto;