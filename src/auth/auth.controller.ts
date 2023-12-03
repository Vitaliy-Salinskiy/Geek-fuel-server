import { Controller, Request, Post, UseGuards, Body } from "@nestjs/common";
import { Request as ExpressRequest } from "express"

import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./guards/local.auth.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("auth")
export class AuthController {

	constructor(private userService: UsersService) { }

	@UseGuards(LocalAuthGuard)
	@Post("/login")
	async login(@Request() req: ExpressRequest) {
		return req.user;
	}

	@Post("/registration")
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.userService.createUser(createUserDto.username, createUserDto.password);
	}

}