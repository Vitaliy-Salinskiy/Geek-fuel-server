import { Controller, Request, Post, UseGuards, Body, Get } from "@nestjs/common";
import { Request as ExpressRequest } from "express"

import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {

	constructor(
		private userService: UsersService,
		private authService: AuthService
	) { }

	@UseGuards(LocalAuthGuard)
	@Post("/login")
	async login(@Request() req: ExpressRequest) {
		return this.authService.login(req.user);
	}

	@Post("/registration")
	async registration(@Body() createUserDto: CreateUserDto) {
		return await this.userService.createUser(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get("/profile")
	getProfile(@Request() req: ExpressRequest) {
		return req.user
	}

}