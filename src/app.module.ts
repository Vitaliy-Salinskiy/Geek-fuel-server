import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose"

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { RolesModule } from './roles/roles.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { MessagesModule } from './messages/messages.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: "src/.env"
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>("MONGO_DB_URL")
			}),
		}),
		AuthModule,
		UsersModule,
		PostsModule,
		FilesModule,
		RolesModule,
		LikesModule,
		CommentsModule,
		MessagesModule,
	],
})
export class AppModule { }
