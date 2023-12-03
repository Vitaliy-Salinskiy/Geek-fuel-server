import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';

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
			models: [User],
			autoLoadModels: true
		}),
		AuthModule,
		UsersModule,
	],
	controllers: [],
})
export class AppModule { }
