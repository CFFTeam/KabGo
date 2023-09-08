import { IsString, IsNotEmpty, MinLength, IsBoolean } from "class-validator";

class DriverRegisterDto {
    @IsString({message: "Phone number must be a string"})
    public phonenumber: string;

    @IsNotEmpty({message: "Name is required"})
    @IsString({message: "Name must be a string"})
    public name: string;

    @IsNotEmpty({message: "Avatar is required"})
    @IsString({message: "Avatar must be a string"})
    public avatar: string;

    @IsNotEmpty({message: "Email is required"})
    @IsString({message: "Email must be a string"})
    public email: string;

    @IsNotEmpty({message: "Begin day is required"})
    @IsString({message: "Begin day must be a string"})
    public begin_day: string;

    @IsNotEmpty({message: "Social is required"})
    @IsBoolean({message: "Social must be a boolean"})
    public social: boolean;

    constructor(phonenumber: string, name: string, avatar: string, email: string, begin_day: string, social: boolean) {
        this.phonenumber = phonenumber;
        this.name = name;
        this.avatar = avatar;
        this.email = email;
        this.begin_day = begin_day;
        this.social = social;
    }
} 

export default DriverRegisterDto;