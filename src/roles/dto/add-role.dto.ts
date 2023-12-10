import { IsNotEmpty, IsString, Length } from "class-validator";
import { Types } from "mongoose";

export class AddRoleDto {

	@IsNotEmpty({ message: "Value is required" })
	@IsString({ message: "Value must be a string" })
	@Length(2, 25, { message: "Value should contain between 2 and 25 characters" })
	readonly value: string;

	@IsNotEmpty()
	readonly userId: Types.ObjectId;

}	