import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/models/posts.model";
import { FilesModule } from './files/files.module';
import { Like } from './posts/models/like.model';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/model/roles.model"
import { UserRoles } from './roles/model/user-roles.model';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: "src/.env"
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'root',
			database: 'Geek-fuel',
			models: [User, Post, Like, Role, UserRoles],
			autoLoadModels: true,
		}),
		AuthModule,
		UsersModule,
		PostsModule,
		FilesModule,
		RolesModule,
	],
	controllers: [],
})
export class AppModule { }
