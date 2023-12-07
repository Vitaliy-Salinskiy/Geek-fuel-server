import { Table, Column, DataType, Model, BelongsTo, ForeignKey } from "sequelize-typescript";

import { User } from "src/users/models/user.model";
import { Post } from "./posts.model";

@Table({ tableName: "likes", createdAt: false, updatedAt: false })
export class Like extends Model<Like> {

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	userId: number

	@ForeignKey(() => Post)
	@Column({ type: DataType.INTEGER, allowNull: false })
	postId: number

	@BelongsTo(() => User)
	user: User

	@BelongsTo(() => Post)
	post: Post

};