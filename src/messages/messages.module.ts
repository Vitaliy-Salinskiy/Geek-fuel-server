import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessagesService } from './messages.service';
import { Message, MessageSchema } from './schemas/messages.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
	providers: [MessagesService],
	imports: [
		MongooseModule.forFeature([
			{ name: Message.name, schema: MessageSchema }
		]),
		UsersModule
	],
	exports: [MessagesService]
})
export class MessagesModule { }
