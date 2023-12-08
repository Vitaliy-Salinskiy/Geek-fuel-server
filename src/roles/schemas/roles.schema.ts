import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {

	@Prop({ type: String, required: true })
	value: string;

	@Prop({ type: String, required: true })
	description: string;

}

export const RoleSchema = SchemaFactory.createForClass(Role);