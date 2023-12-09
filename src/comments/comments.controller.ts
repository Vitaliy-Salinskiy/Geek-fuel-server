import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Types } from 'mongoose';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) { }

	@Post()
	create(@Body() body: any) {
		const createCommentDto = body.createCommentDto;
		const createMessageDto = body.createMessageDto;

		return this.commentsService.create(createCommentDto, createMessageDto);
	}

	@Get()
	findAll() {
		return this.commentsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: Types.ObjectId) {
		return this.commentsService.findOne(id);
	}

	@Put(':id')
	update(@Param('id') id: Types.ObjectId) {
		return this.commentsService.update(id);
	}

	@Delete(':id')
	remove(@Param('id') id: Types.ObjectId, @Body() dto: DeleteCommentDto) {
		return this.commentsService.remove(id, dto);
	}
}