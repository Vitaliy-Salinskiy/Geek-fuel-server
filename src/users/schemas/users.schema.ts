import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument, Types } from "mongoose";

import { Role } from "../../roles/schemas/roles.schema";
import { Post } from "../../posts/schemas/posts.schema";
import { Comment } from "../../comments/schemas/comments.schema";
import { Message } from "../../messages/schemas/messages.schema";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

	@ApiProperty({ description: 'The unique identifier of the user.' })
	_id: Types.ObjectId;

	@ApiProperty({ description: 'The username of the user.', required: true })
	@Prop({ type: String, required: true })
	username: string;

	@ApiProperty({ description: 'The password of the user.', required: true })
	@Prop({ type: String, required: true })
	password: string;

	@ApiProperty({ description: 'Roles assigned to the user.', type: [Role] })
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }] })
	roles: Types.ObjectId[];

	@ApiProperty({ description: 'Posts created by the user.', type: [Post] })
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] })
	posts: Types.ObjectId[];

	@ApiProperty({ description: 'Posts liked by the user.', type: [Post] })
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] })
	likedPosts: Types.ObjectId[];

	@ApiProperty({ description: 'Comments made by the user.', type: [Comment] })
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] })
	comments: Types.ObjectId[];

	@ApiProperty({ description: 'Messages associated with the user.', type: [Message] })
	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }] })
	messages: Types.ObjectId[];

}

export const UserSchema = SchemaFactory.createForClass(User)