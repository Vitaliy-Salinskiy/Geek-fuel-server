import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateMessageDto {

	@ApiProperty({
		description: "The ID of the sender.",
		type: Types.ObjectId,
		example: "65765ccbd2091cd75506450c",
	})
	@IsNotEmpty({ message: "Sender ID is required" })
	readonly senderId: Types.ObjectId;

	@ApiProperty({
		description: "The ID of the receiver.",
		type: Types.ObjectId,
		example: "65765ccbd2091cd75506450c",
	})
	@IsNotEmpty({ message: "Receiver ID is required" })
	readonly receiverId: Types.ObjectId;

}