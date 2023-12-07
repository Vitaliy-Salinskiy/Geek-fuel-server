import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './model/roles.model';
import e from 'express';

@Injectable()
export class RolesService {

	constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

	async createRole(dto: CreateRoleDto) {
		try {
			const role = await this.roleRepository.create(dto);
			return role;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async getRoleByValue(value: string) {
		try {
			const role = await this.roleRepository.findOne({ where: { value } });

			if (!role) {
				throw new HttpException(`Role with value: ${value} not found`, HttpStatus.NOT_FOUND)
			}

			return role;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

}
