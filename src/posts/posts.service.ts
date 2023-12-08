import { HttpException, HttpStatus, NotFoundException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { UpdatePostDto } from "./dto/update-post.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { FilesService } from "../files/files.service";
import { Post } from "./schemas/posts.schema";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/schemas/users.schema";

@Injectable()
export class PostsService {

	constructor(
		@InjectModel(Post.name) private postRepository: Model<Post>,
		@InjectModel(User.name) private userRepository: Model<User>,
		private userService: UsersService,
		private fileService: FilesService
	) { }


	async getSinglePost(title: string): Promise<Post> {
		const post = await await this.postRepository.findOne({ title }).populate("author").exec();

		if (!post) {
			throw new NotFoundException(`Post with such title: ${title} doesn't exist`)
		}

		return post;
	}

	async getAllPosts(): Promise<Post[]> {
		return await this.postRepository.find().populate("author").exec();
	}

	async createPost(dto: CreatePostDto, image: any): Promise<Post> {
		try {
			const user = await this.userRepository.findById(dto.userId); // using userRepository directly to avoid TypeScript issue: await user.save()

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

	async updatePost(title: string, dto: UpdatePostDto, image: any): Promise<Post> {
		try {
			const post = await this.postRepository.findOne({ title });

			if (!post) {
				throw new NotFoundException(`Post with such title: ${title} doesn't exist`)
			}

			this.fileService.fileToWebp(image);
			this.fileService.updateFile(post.image, image.path);

			const updatedPost = await this.postRepository.findOneAndUpdate({ title }, { ...dto }, { new: true }).exec();

			return updatedPost;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deletePost(title: string) {
		try {
			const post = await this.postRepository.findOne({ title }).exec();

			if (!post) {
				throw new NotFoundException(`Post with such title: ${title} doesn't exist`)
			}

			await this.postRepository.findOneAndDelete({ title }).exec();

			const user = await this.userRepository.findById(post.author.toString()); // using userRepository directly to avoid TypeScript issue: await user.save()

			user.posts = user.posts.filter(userPost => userPost.toString() !== post._id.toString());
			await user.save();

			return { message: 'Post deleted successfully', deletedPost: post };
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

}
