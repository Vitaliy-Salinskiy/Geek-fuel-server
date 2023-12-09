import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AddRoleDto } from "src/roles/dto/add-role.dto";

@Controller("users")
export class UsersController {

	constructor(private userService: UsersService) { }

	@Get("/:username")
	getOne(@Param("username") username: string) {
		return this.userService.getOneUserByName(username);
	}

	@Get()
	getAll() {
		return this.userService.getAllUsers();
	}

	@Post("/role")
	addRole(@Body() dto: AddRoleDto) {
		return this.userService.addRole(dto);
	}

}