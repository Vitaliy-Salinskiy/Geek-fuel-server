import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './model/roles.model';
import { User } from 'src/users/models/user.model';
import { UserRoles } from './model/user-roles.model';

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	imports: [
		SequelizeModule.forFeature([Role, User, UserRoles])
	],
	exports: [RolesService]
})
export class RolesModule { }
