import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schemas/comments.schema';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';

@Injectable()
export class CommentsService {

	constructor(
		@InjectModel(Comment.name) private commentRepository: Model<Comment>,
		private userService: UsersService,
		private postService: PostsService,
		private messageService: MessagesService,
	) { }

	async create(createCommentDto: CreateCommentDto, createMessageDto: CreateMessageDto): Promise<CommentDocument> {
		try {

			const user = await this.userService.getOneUserByName(createCommentDto.username);
			const post = await this.postService.getSinglePost(createCommentDto.postTitle);

			if (!user && !post) {
				throw new NotFoundException("User or post not found");
			}

			const comment = await new this.commentRepository({ ...createCommentDto, author: user._id, post: post._id }).save();

			user.comments.push(comment._id);
			await user.save();

			post.comments.push(comment._id);
			await post.save();

			await this.messageService.sentPostMessage(createMessageDto);

			return comment;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async findAll(): Promise<CommentDocument[]> {
		return this.commentRepository.find().populate("author").exec();
	}

	async findOne(id: Types.ObjectId): Promise<CommentDocument> {
		try {
			const comment = await this.commentRepository.findById(id).populate("author").exec();

			if (comment) {
				throw new NotFoundException("Comment not found");
			}

			return comment;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async update(id: Types.ObjectId): Promise<CommentDocument> {
		try {
			const comment = await this.commentRepository.findById(id).populate("author").exec();

			comment.approved = true;
			await comment.save()

			return comment;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async remove(id: Types.ObjectId, dto: DeleteCommentDto) {
		try {
			const user = await this.userService.getOneUserByName(dto.username);
			const post = await this.postService.getSinglePost(dto.postTitle);

			user.comments = user.comments.filter((commentId) => commentId.toString() !== id.toString());
			await user.save();

			post.comments = post.comments.filter((commentId) => commentId.toString() !== id.toString());
			await post.save();

			return await this.commentRepository.findByIdAndDelete(id).exec();
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

}