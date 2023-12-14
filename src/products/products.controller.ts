import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument, ProductSchema } from './schemas/product.schema';

@ApiTags("products")
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) { }

	@Post()
	@UseInterceptors(FileInterceptor("image"))
	@ApiOperation({ summary: "Create a new product" })
	@ApiBody({ type: CreateProductDto, description: 'DTO for creating a product' })
	@ApiResponse({ status: 201, description: "The operation was successful and the created product data is in the response body", type: Product })
	create(@Body() createProductDto: CreateProductDto, @UploadedFile() image: Express.Multer.File): Promise<ProductDocument> {
		return this.productsService.create(createProductDto, image);
	}

	@Get()
	@ApiOperation({ summary: "Retrieve all products" })
	@ApiResponse({ status: 200, description: "The operation was successful and the list of all products is in the response body", type: [Product] })
	findAll(): Promise<ProductDocument[]> {
		return this.productsService.findAll();
	}


	@Get('/:id')
	@ApiOperation({ summary: "Retrieve a product by ID" })
	@ApiResponse({ status: 200, description: "The operation was successful and the requested product data is in the response body", type: Product })
	findOne(@Param('id') id: Types.ObjectId): Promise<ProductDocument> {
		return this.productsService.findOne(id);
	}

	@Delete('/:id')
	@ApiOperation({ summary: "Delete a product by ID" })
	@ApiResponse({ status: 202, description: "The operation was successful and the requested message is in the response body", type: Product })
	remove(@Param('id') id: Types.ObjectId) {
		return this.productsService.remove(id);
	}

}
