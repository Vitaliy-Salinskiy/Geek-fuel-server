import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { LikesService } from './likes.service';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { Post as PostSchema } from '../posts/schemas/posts.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';

@ApiTags("likes")
@Controller('likes')
export class LikesController {

	constructor(private likeService: LikesService) { }

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("USER")
	@Post("/:postId/user/:userId")
	@ApiOperation({ summary: 'Like a post' })
	@ApiParam({ name: 'postId', type: String, description: 'ID of the post to like' })
	@ApiParam({ name: 'userId', type: String, description: 'ID of the user liking the post' })
	@ApiBody({ type: CreateMessageDto, description: 'DTO for liking a post' })
	@ApiResponse({ status: 200, description: 'Successfully liked the post', type: PostSchema })
	async likePost(@Param("postId") postId: Types.ObjectId, @Param("userId") userId: Types.ObjectId, @Body() dto: CreateMessageDto) {
		return this.likeService.likePost(postId, userId, dto);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("USER")
	@Delete("/:postId/user/:userId")
	@ApiOperation({ summary: 'Unlike a post' })
	@ApiParam({ name: 'postId', type: 'string', description: 'ID of the post to unlike' })
	@ApiParam({ name: 'userId', type: 'string', description: 'ID of the user unliking the post' })
	@ApiResponse({ status: 200, description: 'Successfully unliked the post', type: PostSchema })
	async unlikePost(@Param("postId") postId: Types.ObjectId, @Param("userId") userId: Types.ObjectId) {
		return this.likeService.unlikePost(postId, userId);
	}

}
