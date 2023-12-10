import { Controller, Post, Get, Param, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AddRoleDto } from "src/roles/dto/add-role.dto";
import { Types } from "mongoose";

@Controller("users")
export class UsersController {

	constructor(private userService: UsersService) { }

	@Get("/:id")
	getOne(@Param("id") id: Types.ObjectId) {
		return this.userService.getOneUser(id);
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