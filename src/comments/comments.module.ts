import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from './schemas/comments.schema';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
	controllers: [CommentsController],
	providers: [CommentsService],
	imports: [
		MongooseModule.forFeature([
			{ name: Comment.name, schema: CommentSchema }
		]),
		PostsModule,
		UsersModule
	]
})
export class CommentsModule { }
