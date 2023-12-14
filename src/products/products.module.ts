import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from 'src/files/files.module';

@Module({
	controllers: [ProductsController],
	providers: [ProductsService],
	imports: [
		MulterModule.registerAsync({
			useFactory: () => ({
				dest: './uploads/products',
			}),
		}),
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema }
		]),
		FilesModule
	]
})
export class ProductsModule { }
