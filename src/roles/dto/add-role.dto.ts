import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Types } from "mongoose";

export class AddRoleDto {

	@ApiProperty({
		description: "The value of the role.",
		minLength: 2,
		maxLength: 25,
		example: "ADMIN",
	})
	@IsNotEmpty({ message: "Value is required" })
	@IsString({ message: "Value must be a string" })
	@Length(2, 25, { message: "Value should contain between 2 and 25 characters" })
	readonly value: string;

	@ApiProperty({
		description: "The user ID associated with the role.",
		example: "65765ccbd2091cd75506450c",
	})
	@IsNotEmpty()
	readonly userId: Types.ObjectId;

}	