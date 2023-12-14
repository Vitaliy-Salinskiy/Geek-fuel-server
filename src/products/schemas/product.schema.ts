import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {

	@ApiProperty({ description: 'The title of the product', example: 'Product Title' })
	@Prop({ type: String, required: true, unique: true })
	title: string

	@ApiProperty({ description: 'The price of the product', example: 19.99 })
	@Prop({ type: Number, required: true })
	price: number

	@ApiProperty({ description: 'The image URL of the product' })
	@Prop({ type: String, required: true })
	image: string

	@ApiProperty({ description: 'The colors of the product', example: ['red', 'blue', 'green'] })
	@Prop({ type: [String], required: true })
	colors: string[]

}

export const ProductSchema = SchemaFactory.createForClass(Product)