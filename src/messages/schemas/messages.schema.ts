import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose, { Date, HydratedDocument, Types } from "mongoose";

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {

	@Prop({ type: String, required: true })
	title: string;

	@Prop({ type: mongoose.Schema.Types.Date, default: () => Date.now() })
	date: Date

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	sender: Types.ObjectId

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	receiver: Types.ObjectId

}

export const MessageSchema = SchemaFactory.createForClass(Message);