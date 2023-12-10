import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class DeleteCommentDto {

	@IsNotEmpty({ message: "User ID is required" })
	userId: Types.ObjectId;

	@IsNotEmpty({ message: "Post ID is required" })
	postId: Types.ObjectId;

} 