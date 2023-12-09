import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FilesModule } from '../files/files.module';
import { Post, PostSchema } from "./schemas/posts.schema";
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { Comment, CommentSchema } from 'src/comments/schemas/comments.schema';


@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [
		MulterModule.register({
			dest: "./uploads/posts"
		}),
		MongooseModule.forFeature([
			{ name: Post.name, schema: PostSchema },
			{ name: User.name, schema: UserSchema },
			{ name: Comment.name, schema: CommentSchema },
		]),
		FilesModule,
		UsersModule
	],
	exports: [PostsService]
})
export class PostsModule { }
