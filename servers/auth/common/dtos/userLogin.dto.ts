import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { Expose } from "class-transformer";

class UserLoginDto {
    @IsNotEmpty({message: "Phone number is required"})
    @IsString({message: "Phone number must be a string"})
    public phone_number: string;

    @IsNotEmpty({message: "Password is required"})
    @IsString({message: "Password must be a string"})
    @MinLength(8, {message: "Password must be at least 8 characters long"})
    public password: string;

    constructor(phone_number: string, password: string) {
        this.phone_number = phone_number;
        this.password = password;
    }
} 

export default UserLoginDto;

// the constructor above has the same meaning as the below constructor
// constructor(username: string, password: string, rememberMe: boolean) {
//     this.username = username;
//     this.password = password;
//     this.rememberMe = rememberMe;
//   }