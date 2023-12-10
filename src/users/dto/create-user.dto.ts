import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateUserDto {

	@IsNotEmpty({ message: "Username is required" })
	@IsString({ message: "Username must be a string" })
	@Length(4, 24, { message: "Username should contain between 4 and 24 characters" })
	readonly username: string;

	@IsNotEmpty({ message: "Password is required" })
	@IsString({ message: "Password must be a string" })
	@Length(6, 24, { message: "Password should contain between 6 and 24 characters" })
	readonly password: string;

}