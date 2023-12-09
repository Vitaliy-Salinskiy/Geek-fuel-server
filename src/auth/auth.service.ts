import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcryptjs";

import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) { }

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.usersService.getOneUserByName(username);

		if (user) {
			const isPasswordsEqual = await bcrypt.compare(password, user.password)

			if (isPasswordsEqual) {
				const { password, ...result } = user;
				return result;
			}

		}

		return null;
	}

	async login(user: any) {
		const payload = { username: user._doc.username, sub: user._doc._id, roles: user._doc.roles }
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

}
