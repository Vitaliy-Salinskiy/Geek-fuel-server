import { IsOptional, IsString, Length } from "class-validator";

export class UpdatePostDto {

	@IsOptional()
	@IsString({ message: "Title must be a string" })
	@Length(2, 50, { message: "Title should contain between 2 and 50 characters" })
	readonly title: string;

	@IsOptional()
	@IsString({ message: "Content must be a string" })
	@Length(2, 500, { message: "Content should contain between 2 and 500 characters" })
	readonly content: string;

}