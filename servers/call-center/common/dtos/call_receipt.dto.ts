import { IsString, IsNotEmpty, Contains, NotContains } from "class-validator";

class CallReceiptDto {
	constructor(obj: any) {
		Object.assign(this, obj);
	}
	@IsNotEmpty({ message: "Tên không được rỗng" })
	@IsString({ message: "Tên phải là chuỗi" })
	public customer_name: string | any;

	@IsNotEmpty({ message: "Số điện thoại không được rỗng" })
	@IsString({ message: "Số điện thoại phải là chuỗi" })
	public customer_phonenumber: string | any;

    @IsNotEmpty({ message: "Lựa chọn loại xe không được rỗng" })
	@IsString({ message: "Lựa chọn loại xe phải là chuỗi" })
	@NotContains("Chọn loại xe", {message: "Vui lòng lựa chọn loại xe"})
	public vehicle_type: string | any;

    @IsNotEmpty({ message: "Địa chỉ đón không được rỗng" })
	@IsString({ message: "Địa chỉ đón phải là chuỗi" })
	public origin: string | any;

    @IsNotEmpty({ message: "Địa chỉ đến không được rỗng" })
	@IsString({ message: "Địa chỉ đón phải là chuỗi" })
	public destination: string | any;
}

export default CallReceiptDto;