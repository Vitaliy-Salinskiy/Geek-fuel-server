import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './schemas/roles.schema';

@Injectable()
export class RolesService {

	constructor(@InjectModel(Role.name) private roleRepository: Model<Role>) { }

	async createRole(dto: CreateRoleDto) {
		try {
			const role = await new this.roleRepository({ ...dto, value: dto.value.toUpperCase() }).save();
			return role;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async getRoleByValue(value: string) {
		try {
			const role = await this.roleRepository.findOne({ value }).exec();

			if (!role) {
				throw new HttpException(`Role with value: ${value} not found`, HttpStatus.NOT_FOUND)
			}

			return role;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

}
