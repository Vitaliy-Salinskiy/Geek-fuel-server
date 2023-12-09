import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {

	_id: Types.ObjectId;

	@Prop({ type: String })
	image: string;

	@Prop({ type: String, required: true })
	title: string;

	@Prop({ type: String, required: true })
	content: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	author: Types.ObjectId;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
	likedBy: Types.ObjectId[];

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }] })
	comments: Types.ObjectId[];

}

export const PostSchema = SchemaFactory.createForClass(Post);