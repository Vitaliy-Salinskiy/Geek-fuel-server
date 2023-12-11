import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { CreateMessageDto } from "../messages/dto/create-message.dto";
import { MessagesService } from "../messages/messages.service";
import { Post } from "../posts/schemas/posts.schema";
import { User } from "../users/schemas/users.schema";

@Injectable()
export class LikesService {

	constructor(
		@InjectModel(User.name) private userRepository: Model<User>,
		@InjectModel(Post.name) private postRepository: Model<Post>,
		private messageService: MessagesService
	) { }

	async likePost(postId: Types.ObjectId, userId: Types.ObjectId, dto: CreateMessageDto): Promise<Post> {
		try {
			const post = await this.postRepository.findById(postId);
			const user = await this.userRepository.findById(userId);

			if (!user || !post) {
				throw new NotFoundException(`Post or user not found`);
			}

			if (!user.likedPosts.includes(postId)) {
				user.likedPosts.push(postId);
				await user.save()
			}

			if (!post.likedBy.includes(userId)) {
				post.likedBy.push(userId);
				await post.save()

				await this.messageService.sentLikeMessage(dto);
			}

			return post.populate("likedBy");
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async unlikePost(postId: Types.ObjectId, userId: Types.ObjectId): Promise<Post> {
		try {

			const post = await this.postRepository.findById(postId);
			const user = await this.userRepository.findById(userId);

			if (!user || !post) {
				throw new NotFoundException(`Post or user not found`);
			}

			if (user.likedPosts.includes(postId)) {
				user.likedPosts = user.likedPosts.filter((liked) => liked.toString() !== postId.toString());
				await user.save()
			}

			if (post.likedBy.includes(userId)) {
				post.likedBy = post.likedBy.filter((liked) => liked.toString() !== userId.toString());
				await post.save()
			}

			return post.populate("likedBy");
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

}