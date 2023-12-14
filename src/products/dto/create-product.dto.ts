import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

	@ApiProperty({
		description: "The title of the post.",
		example: "My Product",
	})
	readonly title: string;

	@ApiProperty({
		description: "The price of the product.",
		minimum: 0.1,
		example: 20
	})
	readonly price: number;

	@ApiProperty({
		description: "The colors of the product.",
		example: ["red", "blue", "green"],
	})
	readonly colors: string[]
}
