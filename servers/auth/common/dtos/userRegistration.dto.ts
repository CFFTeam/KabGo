import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

class UserRegistrationDto {
    @IsNotEmpty({message: "Phone number is required"})
    @IsString({message: "Phone number must be a string"})
    public phone_number: string;

    @IsNotEmpty({message: "Password is required"})
    @IsString({message: "Password must be a string"})
    @MinLength(8, {message: "Password must be at least 8 characters long"})
    public password: string;

    @IsNotEmpty({message: "Password confirm is required"})
    @IsString({message: "Password confirm must be a string"})
    @MinLength(8, {message: "Password confirm must be at least 8 characters long"})
    public password_confirm: string;

    // Custom method to compare password and passwordConfirm
    comparePasswords(): boolean {
        return this.password === this.password_confirm;
    }

    constructor(phone_number: string, password: string, password_confirm: string) {
        this.phone_number = phone_number;
        this.password = password;
        this.password_confirm = password_confirm;
    }
}

export default UserRegistrationDto;