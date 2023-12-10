import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRoleDto {

	@IsNotEmpty({ message: "Value is required" })
	@IsString({ message: "Value must be a string" })
	@Length(2, 25, { message: "Value should contain between 2 and 25 characters" })
	value: string;

	@IsNotEmpty({ message: "Description is required" })
	@IsString({ message: "Description must be a string" })
	@Length(2, 200, { message: "Description should contain between 2 and 200 characters" })
	readonly description: string;

}