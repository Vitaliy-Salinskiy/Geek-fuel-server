import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty } from "class-validator"
import { Types } from "mongoose"

export class CreatePostDto {

	@ApiProperty({
		description: "The title of the post.",
		minLength: 2,
		maxLength: 50,
		example: "My Post",
	})
	@IsNotEmpty({ message: "Title is required" })
	@IsString({ message: "Title must be a string" })
	@Length(2, 50, { message: "Title should contain between 2 and 50 characters" })
	readonly title: string;

	@ApiProperty({
		description: "The content of the post.",
		minLength: 2,
		maxLength: 500,
		example: "Content of my post.",
	})
	@IsString({ message: "Content must be a string" })
	@IsNotEmpty({ message: "Content is required" })
	@Length(2, 500, { message: "Content should contain between 2 and 500 characters" })
	readonly content: string;

	@ApiProperty({
		description: "The user ID associated with the post.",
		example: "65765ccbd2091cd75506450c",
	})
	@IsNotEmpty({ message: "User ID is required" })
	readonly userId: Types.ObjectId;

}
