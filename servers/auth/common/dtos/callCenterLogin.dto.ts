import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { Expose } from "class-transformer";

class CallCenterLoginDto {
    public phone_number: string;

    @IsNotEmpty({message: "Email không được rỗng"})
    @IsString({message: "Email phải là dạng chuỗi"})
    public email: string;
  
    @IsNotEmpty({message: "Mật khẩu là bắt buộc"})
    @IsString({message: "Mật khẩu phải là dạng chuỗi"})
    @MinLength(8, {message: "Mật khẩu phải có độ dài tối thiểu là 8 kí tự"})
    public password: string;

    constructor(phone_number: '', email: string, password: string) {
        this.phone_number = phone_number;
        this.email = email;
        this.password = password;
    }
} 

export default CallCenterLoginDto;

// the constructor above has the same meaning as the below constructor
// constructor(username: string, password: string, rememberMe: boolean) {
//     this.username = username;
//     this.password = password;
//     this.rememberMe = rememberMe;
//   }