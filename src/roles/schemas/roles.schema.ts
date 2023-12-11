import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {

	@ApiProperty({ description: 'The value of the role.', required: true })
	@Prop({ type: String, required: true })
	value: string;

	@ApiProperty({ description: 'The description of the role.', required: true })
	@Prop({ type: String, required: true })
	description: string;

}

export const RoleSchema = SchemaFactory.createForClass(Role);