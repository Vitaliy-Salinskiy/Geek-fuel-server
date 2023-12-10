import { IsString, Length, IsNotEmpty } from "class-validator"
import { Types } from "mongoose"

export class CreatePostDto {

	@IsNotEmpty({ message: "Title is required" })
	@IsString({ message: "Title must be a string" })
	@Length(2, 50, { message: "Title should contain between 2 and 50 characters" })
	readonly title: string;

	@IsString({ message: "Content must be a string" })
	@IsNotEmpty({ message: "Content is required" })
	@Length(2, 500, { message: "Content should contain between 2 and 500 characters" })
	readonly content: string;

	@IsNotEmpty({ message: "User ID is required" })
	readonly userId: Types.ObjectId;

}
