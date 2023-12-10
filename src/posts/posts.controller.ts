import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";

import { PostsService } from './posts.service';
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Types } from "mongoose";

@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) { }

	@Get("")
	getAll() {
		return this.postsService.getAllPosts();
	}

	@Get("/:id")
	getOne(@Param("id") id: Types.ObjectId) {
		return this.postsService.getSinglePost(id);
	}

	@Post("")
	@UseInterceptors(FileInterceptor("image"))
	create(@Body() dto: CreatePostDto, @UploadedFile() image: Express.Multer.File) {
		return this.postsService.createPost(dto, image);
	}

	@Put("/:id")
	@UseInterceptors(FileInterceptor("image"))
	update(@Param("id") id: Types.ObjectId, @Body() dto: UpdatePostDto, @UploadedFile() image: Express.Multer.File) {
		return this.postsService.updatePost(id, dto, image)
	}

	@Delete("/:id")
	delete(@Param("id") id: Types.ObjectId) {
		return this.postsService.deletePost(id)
	}

}