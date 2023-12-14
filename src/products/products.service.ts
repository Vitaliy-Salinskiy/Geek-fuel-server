import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProductsService {

	constructor(
		@InjectModel(Product.name) private productRepository: Model<Product>,
		private fileService: FilesService,
	) { }

	async create(createProductDto: CreateProductDto, image: any): Promise<ProductDocument> {
		try {
			const product = await this.productRepository.findOne({ title: createProductDto.title }).exec();

			if (product) {
				throw new ConflictException(`Product with title: ${createProductDto.title} already exist`)
			}

			if (+createProductDto.price < 0) {
				throw new BadRequestException("Price cannot be negative")
			}

			const imagePath = this.fileService.fileToWebp(image)
			const newProduct = await new this.productRepository({ ...createProductDto, price: +createProductDto.price, image: imagePath }).save();
			return newProduct
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async findAll(): Promise<ProductDocument[]> {
		try {
			return await this.productRepository.find().exec()
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async findOne(id: Types.ObjectId): Promise<ProductDocument> {
		try {
			const product = await this.productRepository.findById(id).exec();

			if (!product) {
				throw new NotFoundException("Product not found")
			}

			return product
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

	async remove(id: Types.ObjectId) {
		try {
			const product = await this.productRepository.findById(id).exec();

			if (!product) {
				throw new NotFoundException("Product not found")
			}

			this.fileService.deleteImage(product.image)
			await this.productRepository.deleteOne({ _id: id }).exec();

			return { message: "Product was successfully deleted", product }
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}

}
