import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from "bcryptjs";

import { User } from './models/user.model';
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "src/roles/dto/add-role.dto";

@Injectable()
export class UsersService {

	constructor(
		@InjectModel(User) private readonly usersRepository: typeof User,
		private roleService: RolesService
	) { }

	async getOneUser(username: string): Promise<User> {
		return this.usersRepository.findOne({ where: { username }, include: ["posts", "roles", "likes"] });
	}

	async getAllUsers(): Promise<User[]> {
		return this.usersRepository.findAll({ include: ["posts", "roles", "likes"] });
	}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		try {
			const candidate = await this.usersRepository.findOne({ where: { username: createUserDto.username } });

			if (candidate) {
				throw new HttpException(`User with such username: ${createUserDto.username} already exists`, HttpStatus.CONFLICT);
			}

			const hashedPassword = await bcrypt.hash(createUserDto.password, 4);
			const user = await this.usersRepository.create({ username: createUserDto.username, password: hashedPassword });

			const role = await this.roleService.getRoleByValue("USER");
			await user.$set("roles", [role.id])

			return user;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async addRole(dto: AddRoleDto) {
		try {
			const user = await this.usersRepository.findByPk(dto.userId, { include: ["roles"] });
			const role = await this.roleService.getRoleByValue(dto.value)
			if (role && user) {
				await user.$add("roles", role.id)
				return { message: `Role ${dto.value} was successfully added` };
			}
			throw new HttpException(`User or role not found`, HttpStatus.NOT_FOUND);
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}