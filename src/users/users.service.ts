import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import * as bcrypt from "bcryptjs";


import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "src/roles/dto/add-role.dto";
import { User, UserDocument } from "./schemas/users.schema";

@Injectable()
export class UsersService {

	constructor(
		@InjectModel(User.name) private userRepository: Model<User>,
		private roleService: RolesService
	) { }

	async getOneUser(id: Types.ObjectId): Promise<UserDocument> {
		try {
			const user = await this.userRepository.findById(id).populate("roles posts").exec();

			if (user) {
				return user
			}

			throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getOneUserByName(username: string): Promise<UserDocument> {
		try {
			const user = await this.userRepository.findOne({ username }).populate("roles posts").exec();

			if (user) {
				return user
			}

			throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getAllUsers(): Promise<User[]> {
		return this.userRepository.find().populate("posts roles").exec();
	}

	async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
		try {
			const candidate = await this.userRepository.findOne({ username: createUserDto.username }).exec();

			if (candidate) {
				throw new HttpException(`User with such username: ${createUserDto.username} already exists`, HttpStatus.CONFLICT);
			}

			const hashedPassword = await bcrypt.hash(createUserDto.password, 4);
			const user = await new this.userRepository({ username: createUserDto.username, password: hashedPassword }).save();

			const role = await this.roleService.getRoleByValue("USER");
			user.roles = [role._id]
			await user.save();

			return await user.populate("roles");
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async addRole(dto: AddRoleDto) {
		try {
			const user = await this.userRepository.findById(dto.userId).exec();
			const role = await this.roleService.getRoleByValue(dto.value);
			if (role && user) {
				user.roles.push(role._id);
				await user.save();
				return { message: `Role ${dto.value} was successfully added` };
			}
			throw new HttpException(`User or role not found`, HttpStatus.NOT_FOUND);
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}