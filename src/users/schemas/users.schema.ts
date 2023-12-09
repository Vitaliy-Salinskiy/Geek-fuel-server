import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

	_id: Types.ObjectId

	@Prop({ type: String, required: true })
	username: string;

	@Prop({ type: String, required: true })
	password: string;

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }] })
	roles: Types.ObjectId[]

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] })
	posts: Types.ObjectId[]

	@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] })
	likedPosts: Types.ObjectId[]

}

export const UserSchema = SchemaFactory.createForClass(User)