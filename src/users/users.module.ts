import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { Post } from 'src/posts/models/post.model';
import { User } from './models/user.model';
import { Like } from 'src/posts/models/like.model';

@Module({
	providers: [UsersService],
	imports: [
		SequelizeModule.forFeature([User, Post, Like])
	],
	exports: [UsersService]
})
export class UsersModule { }
