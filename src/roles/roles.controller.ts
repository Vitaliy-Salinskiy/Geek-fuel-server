import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './schemas/roles.schema';

@ApiTags("roles")
@Controller('roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) { }

	@Get("/:value")
	@ApiOperation({ summary: "Retrieving a role by value" })
	@ApiParam({ name: 'value', type: String, description: 'Value of the role' })
	@ApiResponse({ status: 200, description: "The operation was successful and the requested role data is in the response body", type: Role })
	getByValue(@Param("value") value: string) {
		return this.rolesService.getRoleByValue(value);
	}

	@Post()
	@ApiOperation({ summary: "Creating a new role" })
	@ApiBody({ type: CreateRoleDto, description: 'DTO for creating a role' })
	@ApiResponse({ status: 201, description: "The operation was successful and the created role data is in the response body", type: Role })
	create(@Body() dto: CreateRoleDto) {
		return this.rolesService.createRole(dto);
	}
}