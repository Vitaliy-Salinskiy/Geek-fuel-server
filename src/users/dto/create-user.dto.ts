import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateUserDto {

	@ApiProperty({
		description: 'The username of the user.',
		minLength: 4,
		maxLength: 24,
	})
	@IsNotEmpty({ message: "Username is required" })
	@IsString({ message: "Username must be a string" })
	@Length(4, 24, { message: "Username should contain between 4 and 24 characters" })
	readonly username: string;

	@ApiProperty({
		description: 'The password of the user.',
		minLength: 6,
		maxLength: 24,
	})
	@IsNotEmpty({ message: "Password is required" })
	@IsString({ message: "Password must be a string" })
	@Length(6, 24, { message: "Password should contain between 6 and 24 characters" })
	readonly password: string;

}