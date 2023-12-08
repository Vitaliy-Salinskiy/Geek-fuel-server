import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { User, UserSchema } from "./schemas/users.schema"
import { RolesModule } from 'src/roles/roles.module';

@Module({
	providers: [UsersService],
	controllers: [UsersController],
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		RolesModule
	],
	exports: [UsersService]
})
export class UsersModule { }
