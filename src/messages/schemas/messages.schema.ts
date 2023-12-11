import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Date, HydratedDocument, Types } from "mongoose";

import { User } from "../../users/schemas/users.schema";

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {

	@ApiProperty({ description: 'The title of the message.', required: true })
	@Prop({ type: String, required: true })
	title: string;

	@ApiProperty({ description: 'The date the message was sent.', default: Date.now() })
	@Prop({ type: Date, default: () => Date.now() })
	date: Date;

	@ApiProperty({ description: 'The sender of the message.', type: User })
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	sender: Types.ObjectId;

	@ApiProperty({ description: 'The receiver of the message.', type: User })
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
	receiver: Types.ObjectId;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
