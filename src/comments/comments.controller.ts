import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { Comment } from "./schemas/comments.schema"
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags("comments")
@Controller('comments')
export class CommentsController {

	constructor(private readonly commentsService: CommentsService) { }


	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("USER")
	@Post()
	@ApiOperation({ summary: 'Create a new comment' })
	@ApiBody({ type: CreateCommentDto, description: 'DTO for creating a comment' })
	@ApiResponse({ status: 201, description: 'The operation was successful and the created comment data is in the response body', type: Comment })
	create(@Body() body: { createCommentDto: CreateCommentDto, createMessageDto: CreateMessageDto }) {
		return this.commentsService.create(body.createCommentDto, body.createMessageDto);
	}

	@Get()
	@ApiOperation({ summary: 'Retrieve all comments' })
	@ApiResponse({ status: 200, description: 'The operation was successful and the list of all comments is in the response body', type: [Comment] })
	findAll() {
		return this.commentsService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Retrieve a comment by ID' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID of the comment' })
	@ApiResponse({ status: 200, description: 'The operation was successful and the requested comment data is in the response body', type: Comment })
	findOne(@Param('id') id: Types.ObjectId) {
		return this.commentsService.findOne(id);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("ADMIN")
	@Put(':id')
	@ApiOperation({ summary: 'Update a comment by ID' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID of the comment to update' })
	@ApiResponse({ status: 200, description: 'The operation was successful and the updated comment data is in the response body', type: Comment })
	update(@Param('id') id: Types.ObjectId) {
		return this.commentsService.update(id);
	}
	id
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("USER")
	@Delete(':id')
	@ApiOperation({ summary: 'Delete a comment by ID' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID of the comment to delete' })
	@ApiBody({ type: DeleteCommentDto, description: 'DTO for deleting a comment' })
	@ApiResponse({ status: 200, description: 'The operation was successful and the deleted comment data is in the response body', type: Comment })
	remove(@Param('id') id: Types.ObjectId, @Body() dto: DeleteCommentDto) {
		return this.commentsService.remove(id, dto);
	}
}
