import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from "bcryptjs";

import { User } from './models/user.model';
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {

	constructor(@InjectModel(User) private usersRepository: typeof User) { }

	async getOneUser(username: string): Promise<User> {
		return this.usersRepository.findOne({ where: { username } });
	}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		try {
			const candidate = await this.usersRepository.findOne({ where: { username: createUserDto.username } });

			if (candidate) {
				throw new HttpException(`User with such username: ${createUserDto.username} already exists`, HttpStatus.CONFLICT);
			}

			const hashedPassword = await bcrypt.hash(createUserDto.password, 4);
			const user = await this.usersRepository.create({ username: createUserDto.username, password: hashedPassword });
			return user;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}