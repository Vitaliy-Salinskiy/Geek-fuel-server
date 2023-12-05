import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from "@nestjs/sequelize";

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FilesModule } from 'src/files/files.module';
import { Post } from "./models/post.model";
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/models/user.model';

@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [
		MulterModule.register({
			dest: "./uploads/posts"
		}),
		SequelizeModule.forFeature([Post, User]),
		FilesModule,
		UsersModule
	]
})
export class PostsModule { }
