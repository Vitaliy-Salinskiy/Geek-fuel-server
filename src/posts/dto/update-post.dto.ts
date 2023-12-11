import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class UpdatePostDto {

	@ApiPropertyOptional({
		description: "The title of the post.",
		minLength: 2,
		maxLength: 50,
		example: "My Post",
	})
	@IsOptional()
	@IsString({ message: "Title must be a string" })
	@Length(2, 50, { message: "Title should contain between 2 and 50 characters" })
	readonly title: string;

	@ApiPropertyOptional({
		description: "The content of the post.",
		minLength: 2,
		maxLength: 500,
		example: "Content of my post.",
	})
	@IsOptional()
	@IsString({ message: "Content must be a string" })
	@Length(2, 500, { message: "Content should contain between 2 and 500 characters" })
	readonly content: string;

}