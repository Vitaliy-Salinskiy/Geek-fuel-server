import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRoleDto {

	@ApiProperty({
		description: "The value of the role.",
		minLength: 2,
		maxLength: 25,
		example: "ADMIN",
	})
	@IsNotEmpty({ message: "Value is required" })
	@IsString({ message: "Value must be a string" })
	@Length(2, 25, { message: "Value should contain between 2 and 25 characters" })
	value: string;

	@ApiProperty({
		description: "The description of the role.",
		minLength: 2,
		maxLength: 200,
		example: "Administrator role with full access.",
	})
	@IsNotEmpty({ message: "Description is required" })
	@IsString({ message: "Description must be a string" })
	@Length(2, 200, { message: "Description should contain between 2 and 200 characters" })
	readonly description: string;

}