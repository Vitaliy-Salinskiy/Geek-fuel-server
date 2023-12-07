import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { Post } from 'src/posts/models/posts.model';
import { User } from './models/user.model';
import { Like } from 'src/posts/models/like.model';
import { Role } from 'src/roles/model/roles.model';
import { UserRoles } from 'src/roles/model/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UsersController } from './users.controller';

@Module({
	providers: [UsersService],
	controllers: [UsersController],
	imports: [
		SequelizeModule.forFeature([User, Post, Like, Role, UserRoles]),
		RolesModule
	],
	exports: [UsersService]
})
export class UsersModule { }
