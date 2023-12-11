import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class DeleteCommentDto {

	@ApiProperty({
		description: "The user ID associated with the comment.",
		example: "65765ccbd2091cd75506450c",
	})
	@IsNotEmpty({ message: "User ID is required" })
	userId: Types.ObjectId;

	@ApiProperty({
		description: "The post ID associated with the comment.",
		example: "65765ccbd2091cd75506450c",
	})
	@IsNotEmpty({ message: "Post ID is required" })
	postId: Types.ObjectId;

} 