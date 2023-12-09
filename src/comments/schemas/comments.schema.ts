import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument, Types } from "mongoose";

export type CommentDocument = HydratedDocument<Comment>

@Schema()
export class Comment {

	@Prop({ type: String, required: true })
	content: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" })
	author: Types.ObjectId;

	@Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" })
	post: Types.ObjectId;

	@Prop({ type: mongoose.Schema.Types.Date, ref: "User", default: () => Date.now() })
	date: Date;

	@Prop({ type: Boolean, default: false })
	approved: boolean;

}

export const CommentSchema = SchemaFactory.createForClass(Comment)