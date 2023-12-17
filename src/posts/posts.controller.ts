import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { UseGuards, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";

import { Types } from "mongoose";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Post as PostSchema } from "./schemas/posts.schema";
import { PostsService } from "./posts.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Roles } from "src/auth/decorators/roles.decorator";

@ApiTags("posts")
@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) { }

	@Get()
	@ApiOperation({ summary: "Retrieving all posts" })
	@ApiResponse({ status: 200, description: "The operation was successful and the list of all posts is in the response body", type: [PostSchema] })
	getAll() {
		return this.postsService.getAllPosts();
	}

	@Get("/:id")
	@ApiOperation({ summary: "Retrieving a post by ID" })
	@ApiParam({ name: 'id', type: String, description: 'ID of the post' })
	@ApiResponse({ status: 200, description: "The operation was successful and the requested post data is in the response body", type: PostSchema })
	getOne(@Param("id") id: Types.ObjectId) {
		return this.postsService.getSinglePost(id);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("USER")
	@Post()
	@ApiOperation({ summary: "Post has been created" })
	@ApiBody({ type: CreatePostDto, description: 'DTO for creating a post' })
	@ApiResponse({ status: 201, description: "The operation was successful and the created post data is in the response body", type: PostSchema })
	@UseInterceptors(FileInterceptor("image"))
	create(@Body() dto: CreatePostDto, @UploadedFile() image: any) {
		return this.postsService.createPost(dto, image);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("USER")
	@Put("/:id")
	@ApiOperation({ summary: "Post has been updated" })
	@ApiParam({ name: 'id', type: String, description: 'ID of the post' })
	@ApiBody({ type: UpdatePostDto, description: 'DTO for updating a post' })
	@ApiResponse({ status: 200, description: "The operation was successful and the updated post data is in the response body", type: PostSchema })
	@UseInterceptors(FileInterceptor("image"))
	update(@Param("id") id: Types.ObjectId, @Body() dto: UpdatePostDto, @UploadedFile() image: Express.Multer.File) {
		return this.postsService.updatePost(id, dto, image);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles("USER")
	@Delete("/:id")
	@ApiOperation({ summary: "Post has been deleted" })
	@ApiParam({ name: 'id', type: String, description: 'ID of the post' })
	@ApiResponse({ status: 202, description: "The operation was successful and the requested message is in the response body" })
	delete(@Param("id") id: Types.ObjectId) {
		return this.postsService.deletePost(id);
	}
}