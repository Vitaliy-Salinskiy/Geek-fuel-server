import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateCommentDto {

	@IsString({ message: "Content must be a string" })
	@IsNotEmpty({ message: "Content is required" })
	content: string;

	@IsNotEmpty({ message: "User ID is required" })
	userId: Types.ObjectId;

	@IsNotEmpty({ message: "Post ID is required" })
	postId: Types.ObjectId;

}
