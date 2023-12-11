import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

import { User } from "../../users/schemas/users.schema";
import { Comment } from "../../comments/schemas/comments.schema";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {

	@ApiProperty({ description: 'The unique identifier of the post.' })
	_id: Types.ObjectId;

	@ApiProperty({ description: 'The image URL of the post.' })
	@Prop({ type: String })
	image: string;

	@ApiProperty({ description: 'The title of the post.', required: true })
	@Prop({ type: String, required: true })
	title: string;

	@ApiProperty({ description: 'The content of the post.', required: true })
	@Prop({ type: String, required: true })
	content: string;

	@ApiProperty({ description: 'The author of the post.', type: User })
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	author: Types.ObjectId;

	@ApiProperty({ description: 'Users who liked the post.', type: [User] })
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
	likedBy: Types.ObjectId[];

	@ApiProperty({ description: 'Comments associated with the post.', type: [Comment] })
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] })
	comments: Types.ObjectId[];

}

export const PostSchema = SchemaFactory.createForClass(Post);