import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from "bcryptjs";

import { User } from './models/user.model';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User) private userRepository: typeof User) { }

	async getOneUser(username: string): Promise<User> {
		return this.userRepository.findOne({ where: { username } });
	}

	async createUser(username: string, password: string): Promise<User> {
		try {
			const candidate = await this.userRepository.findOne({ where: { username } });

			if (candidate) {
				throw new HttpException(`User with such username: ${username} already exists`, HttpStatus.CONFLICT);
			}

			const hashedPassword = await bcrypt.hash(password, 4);
			const user = await this.userRepository.create({ username, password: hashedPassword });
			return user;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
