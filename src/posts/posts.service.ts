import { HttpException, HttpStatus, NotFoundException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Post } from "./models/posts.model";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { FilesService } from "../files/files.service";
import { Like } from "./models/like.model";
import { CreateLikeDto } from "./dto/create-like.dto";

@Injectable()
export class PostsService {

	constructor(
		@InjectModel(Post) private postsRepository: typeof Post,
		@InjectModel(Like) private likeRepository: typeof Like,
		private fileService: FilesService
	) { }


	async getSinglePost(title: string): Promise<Post> {
		const post = await this.postsRepository.findOne({ where: { title, }, include: { all: true } });

		if (!post) {
			throw new NotFoundException(`Post with such title: ${title} doesn't exist`)
		}

		return post;
	}

	async getAllPosts(): Promise<Post[]> {
		return await this.postsRepository.findAll();
	}

	async createPost(dto: CreatePostDto, image: any): Promise<Post> {
		try {
			const imagePath = this.fileService.fileToWebp(image)
			const newPost = await this.postsRepository.create({ ...dto, image: imagePath });
			return newPost;
		} catch (e) {
			console.log(e)
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async updatePost(title: string, dto: UpdatePostDto, image: any): Promise<Post> {
		try {
			const post = await this.postsRepository.findOne({ where: { title } });

			if (!post) {
				throw new NotFoundException(`Post with such title: ${title} doesn't exist`)
			}

			this.fileService.fileToWebp(image);
			this.fileService.updateFile(post.image, image.path);

			await this.postsRepository.update({ ...dto }, { where: { title } })
			const updatedPost = await this.postsRepository.findByPk(post.id);

			return updatedPost;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async deletePost(title: string) {
		try {
			const post = await this.postsRepository.findOne({ where: { title } });

			if (!post) {
				throw new NotFoundException(`Post with such title: ${title} doesn't exist`)
			}

			const deleteResult: number = await this.postsRepository.destroy({ where: { title } });

			return { message: 'Post deleted successfully', deletedPost: post };
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async likePost(dto: CreateLikeDto) {
		try {
			const like = this.likeRepository.create({ ...dto })
			return like;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

}
