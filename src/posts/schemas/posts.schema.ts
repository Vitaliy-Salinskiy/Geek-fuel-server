import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type PostSchema = HydratedDocument<Post>;

@Schema()
export class Post {

	@Prop({ type: String })
	image: string;

	@Prop({ type: String, required: true })
	title: string;

	@Prop({ type: String, required: true })
	content: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	author: Types.ObjectId

}

export const PostSchema = SchemaFactory.createForClass(Post);