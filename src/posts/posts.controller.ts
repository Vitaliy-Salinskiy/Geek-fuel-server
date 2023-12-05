import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";

import { PostsService } from './posts.service';
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { CreateLikeDto } from "./dto/create-like.dto";

@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) { }

	@Get("/all")
	getAll() {
		return this.postsService.getAllPosts();
	}

	@Get("/:title")
	getOne(@Param("title") title: string) {
		return this.postsService.getSinglePost(title);
	}

	@Post("/create")
	@UseInterceptors(FileInterceptor("image"))
	create(@Body() dto: CreatePostDto, @UploadedFile() image: Express.Multer.File) {
		return this.postsService.createPost(dto, image);
	}

	@Post("/like")
	likePost(@Body() dto: CreateLikeDto) {
		return this.postsService.likePost(dto)
	}

	@Put("/:title")
	@UseInterceptors(FileInterceptor("image"))
	update(@Param("title") title: string, @Body() dto: UpdatePostDto, @UploadedFile() image: Express.Multer.File) {
		return this.postsService.updatePost(title, dto, image)
	}

	@Delete("/:title")
	delete(@Param("title") title: string) {
		return this.postsService.deletePost(title)
	}

}
