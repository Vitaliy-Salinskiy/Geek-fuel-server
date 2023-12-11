import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { Post, PostSchema } from 'src/posts/schemas/posts.schema';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
	providers: [LikesService],
	controllers: [LikesController],
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Post.name, schema: PostSchema },
		]),
		MessagesModule
	]
})
export class LikesModule { }
