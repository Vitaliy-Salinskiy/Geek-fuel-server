import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Types } from "mongoose";

export class CreateCommentDto {

	@IsString({ message: "Content must be a string" })
	@Length(1, 250, { message: "Comment must contain between 1 and 250 characters" })
	@IsNotEmpty({ message: "Content is required" })
	content: string;

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
