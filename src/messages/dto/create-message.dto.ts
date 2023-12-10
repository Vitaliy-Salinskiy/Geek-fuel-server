import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateMessageDto {

	@IsNotEmpty({ message: "Sender ID is required" })
	readonly senderId: Types.ObjectId;

	@IsNotEmpty({ message: "Receiver ID is required" })
	readonly receiverId: Types.ObjectId;

}