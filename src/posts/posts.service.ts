import { HttpException, HttpStatus, NotFoundException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { UpdatePostDto } from "./dto/update-post.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { FilesService } from "../files/files.service";
import { User } from "../users/schemas/users.schema";
import { Post, PostDocument } from "./schemas/posts.schema";
import { UsersService } from "src/users/users.service";
import { Comment } from "src/comments/schemas/comments.schema";

@Injectable()
export class PostsService {

	constructor(
		@InjectModel(Post.name) private postRepository: Model<Post>,
		@InjectModel(User.name) private userRepository: Model<User>,
		@InjectModel(Comment.name) private commentRepository: Model<Comment>,
		private userService: UsersService,
		private fileService: FilesService
	) { }


	async getSinglePost(id: Types.ObjectId): Promise<PostDocument> {
		const post = await this.postRepository.findById(id).populate("author").exec();

		if (!post) {
			throw new NotFoundException(`Post not found`)
		}

		return post;
	}

	async getAllPosts(): Promise<PostDocument[]> {
		return await this.postRepository.find().populate("author").exec();
	}

	async createPost(dto: CreatePostDto, image: any): Promise<PostDocument> {
		try {
			const user = await this.userService.getOneUser(dto.userId);

			if (user) {
				const imagePath = this.fileService.fileToWebp(image)
				const newPost = await new this.postRepository({ ...dto, author: user._id, image: imagePath }).save();

				user.posts.push(newPost._id)
				await user.save();

				return newPost;
			}

			throw new HttpException(`User not found`, HttpStatus.NOT_FOUND)
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async updatePost(id: Types.ObjectId, dto: UpdatePostDto, image: any): Promise<Post> {
		try {
			const post = await this.postRepository.findById(id);

			if (!post) {
				throw new NotFoundException(`Post not found`)
			}

			this.fileService.fileToWebp(image);
			this.fileService.updateFile(post.image, image.path);

			const updatedPost = await this.postRepository.findByIdAndUpdate(id, { ...dto }, { new: true }).exec();

			return updatedPost;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deletePost(id: Types.ObjectId) {
		try {
			const post = await this.postRepository.findById(id).exec();

			if (!post) {
				throw new NotFoundException(`Post not found`)
			}

			await this.commentRepository.deleteMany({ _id: { $in: post.comments } }).exec();

			await this.userRepository.updateMany(
				{},
				{ $pull: { comments: { $in: post.comments } } }
			);

			await this.postRepository.findByIdAndDelete(id).exec();
			this.fileService.deleteImage(post.image)

			await this.userRepository.updateMany(
				{ $or: [{ likedPosts: post._id }, { posts: post._id }] },
				{ $pull: { likedPosts: post._id, posts: post._id } }
			);

			return { message: 'Post deleted successfully', deletedPost: post };
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

}