import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcryptjs";

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(private userService: UsersService) { }

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.userService.getOneUser(username);
		const isPasswordsEqual = await bcrypt.compare(password, user.password)

		if (user && isPasswordsEqual) {
			const { password, ...result } = user;
			return result;
		}

		return null;
	}

}
