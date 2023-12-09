import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMessageDto } from './dto/create-message.dto';
import { UsersService } from 'src/users/users.service';
import { Message, MessageDocument } from './schemas/messages.schema';

@Injectable()
export class MessagesService {

	constructor(
		@InjectModel(Message.name) private messageRepository: Model<Message>,
		private userService: UsersService
	) { }

	async sentLikeMessage(dto: CreateMessageDto): Promise<MessageDocument> {
		try {
			const sender = await this.userService.getOneUserByName(dto.sender);
			const receiver = await this.userService.getOneUserByName(dto.receiver);

			if (!receiver && !sender) {
				throw new NotFoundException("Receiver or sender not found")
			}

			if (receiver._id.toString() === sender._id.toString()) return null;

			const message = await new this.messageRepository({
				receiver: receiver._id,
				sender: sender._id,
				title: `${sender.username} liked your post`
			}).save();

			receiver.messages.push(message._id)
			await receiver.save();

			return message;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async sentPostMessage(dto: CreateMessageDto): Promise<MessageDocument> {
		try {
			const sender = await this.userService.getOneUserByName(dto.sender);
			const receiver = await this.userService.getOneUserByName(dto.receiver);

			if (!receiver && !sender) {
				throw new NotFoundException("Receiver or sender not found")
			}

			if (receiver._id.toString() === sender._id.toString()) return null;

			const message = await new this.messageRepository({
				receiver: receiver._id,
				sender: sender._id,
				title: `${sender.username} left a comment on your post`
			}).save();

			receiver.messages.push(message._id)
			await receiver.save();

			return message;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

}