import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument, Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

import { User } from "../../users/schemas/users.schema";
import { Post } from "../../posts/schemas/posts.schema";

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {

	@ApiProperty({ description: 'The content of the comment.', required: true })
	@Prop({ type: String, required: true })
	content: string;

	@ApiProperty({ description: 'The author of the comment.', type: User, required: true })
	@Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" })
	author: Types.ObjectId;

	@ApiProperty({ description: 'The post to which the comment belongs.', type: Post, required: true })
	@Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" })
	post: Types.ObjectId;

	@ApiProperty({ description: 'The date the comment was created.', type: Date, default: Date.now() })
	@Prop({ type: Date, default: () => Date.now() })
	date: Date;

	@ApiProperty({ description: 'Indicates if the comment is approved.', default: false })
	@Prop({ type: Boolean, default: false })
	approved: boolean;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);