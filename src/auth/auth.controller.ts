import { Controller, Request, Post, UseGuards, Body, Get, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Request as ExpressRequest, Response } from "express"

import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { User as UserSchema } from "../users/schemas/users.schema"
import { RolesGuard } from "./guards/role.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {

	constructor(
		private readonly userService: UsersService,
		private readonly authService: AuthService
	) { }

	@UseGuards(LocalAuthGuard)
	@Post("/login")
	@ApiOperation({ summary: 'Login to the application' })
	@ApiBody({ type: CreateUserDto, description: 'DTO for logging in' })
	@ApiOkResponse({ status: 200, description: 'Successfully logged in', type: UserSchema })
	@ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
	async login(@Request() req: ExpressRequest, @Res({ passthrough: true }) response: Response) {
		const loginResult = await this.authService.login(req.user);
		if (loginResult.access_token) {
			response.cookie('access_token', loginResult.access_token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
			return loginResult;
		}
		return loginResult;
	}

	@Post("/registration")
	@ApiOperation({ summary: 'Register a new user' })
	@ApiBody({ type: CreateUserDto, description: 'DTO for user registration' })
	@ApiOkResponse({ status: 201, description: 'Successfully registered a new user', type: UserSchema })
	async registration(@Body() createUserDto: CreateUserDto) {
		return await this.userService.createUser(createUserDto);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("USER")
	@Get("/profile")
	@ApiOperation({ summary: 'Get user profile' })
	@ApiBearerAuth()
	@ApiOkResponse({ status: 200, description: 'Successfully retrieved user profile', type: UserSchema })
	@ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized' })
	@ApiForbiddenResponse({ status: 403, description: 'Forbidden' })
	getProfile(@Request() req: ExpressRequest) {
		return req.user;
	}

}