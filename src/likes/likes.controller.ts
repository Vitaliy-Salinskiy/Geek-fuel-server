import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { LikesService } from './likes.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';

@Controller('likes')
export class LikesController {

	constructor(private likeService: LikesService) { }

	@Post("/:postId/user/:userId")
	async likePost(@Param("postId") postId: Types.ObjectId, @Param("userId") userId: Types.ObjectId, @Body() dto: CreateMessageDto) {
		return this.likeService.likePost(postId, userId, dto)
	}

	@Delete("/:postId/user/:userId")
	async unlikePost(@Param("postId") postId: Types.ObjectId, @Param("userId") userId: Types.ObjectId) {
		return this.likeService.unlikePost(postId, userId);
	}

}
