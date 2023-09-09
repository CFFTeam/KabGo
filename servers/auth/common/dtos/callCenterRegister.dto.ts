import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

class CallCenterRegistrationDto {
    // address, role, gender
    @IsNotEmpty({message: "Tên nhân viên không được rỗng"})
    @IsString({message: "Tên nhân viên phải là dạng chuỗi"})
    public name: string;

    @IsEmail({}, {message: "Email không hợp lệ"})
    public email: string;

    public dob: string;

    public address: string;

    @IsNotEmpty({message: "Số điện thoại không được rỗng"})
    @IsString({message: "Số điện thoại phải là dạng chuỗi"})
    public phone_number: string;

    @IsNotEmpty({message: "Vai trò nhân viên không được rỗng"})
    @IsString({message: "Vai trò nhân viên phải là dạng chuỗi"})
    public role: string;

    public gender: string;

    @IsNotEmpty({message: "Mật khẩu là bắt buộc"})
    @IsString({message: "Mật khẩu phải là dạng chuỗi"})
    @MinLength(8, {message: "Mật khẩu phải có độ dài tối thiểu là 8 kí tự"})
    public password: string;

    @IsNotEmpty({message: "Mậu khẩu xác nhận là bắt buộc"})
    @IsString({message: "Mật khẩu xác nhận phải là dạng chuỗi"})
    @MinLength(8, {message: "Mật khẩu xác nhận phải có độ dài tối thiểu là 8 kí tự"})
    public password_confirm: string;


    constructor(name: string, email: string, dob: string = '', address: string = '', role: string, gender: string = '',
        phone_number: string, password: string, password_confirm: string) {
        this.name = name;
        this.email = email;
        this.dob = dob;
        this.address = address;
        this.role = role;
        this.gender = gender;
        this.phone_number = phone_number;
        this.password = password;
        this.password_confirm = password_confirm; 
    }
}

export default CallCenterRegistrationDto;