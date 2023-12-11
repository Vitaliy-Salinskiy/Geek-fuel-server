import { Controller, Post, Get, Param, Body, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { Types } from "mongoose";

import { UsersService } from "./users.service";
import { AddRoleDto } from "src/roles/dto/add-role.dto";
import { User } from "./schemas/users.schema";
import { RolesGuard } from "src/auth/guards/role.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";

@ApiTags("users")
@Controller("users")
export class UsersController {

	constructor(private userService: UsersService) { }

	@Get()
	@ApiOperation({ summary: "Retrieving all users" })
	@ApiResponse({ status: 200, description: "The operation was successful and the list of all users is in the response body", type: [User] })
	getAll() {
		return this.userService.getAllUsers();
	}

	@Get("/:id")
	@ApiOperation({ summary: "Retrieving a user by ID" })
	@ApiParam({ name: 'id', type: String, description: 'ID of the user' })
	@ApiResponse({ status: 200, description: "The operation was successful and the requested user data is in the response body", type: User })
	getOne(@Param("id") id: Types.ObjectId) {
		return this.userService.getOneUser(id);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Post("/role")
	@ApiOperation({ summary: "Adding a role to a user" })
	@ApiBody({ type: AddRoleDto, description: 'DTO for adding a role to a user' })
	@ApiResponse({ status: 201, description: "The operation was successful and the role was added to the user" })
	addRole(@Body() dto: AddRoleDto) {
		return this.userService.addRole(dto);
	}

}