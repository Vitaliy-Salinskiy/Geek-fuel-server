import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/models/user.model";

interface PostCreationAttrs {
	image: string;
	title: string;
	content: string;
	id: string
}

@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttrs> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING })
	image: string

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	title: string

	@Column({ type: DataType.STRING, allowNull: false })
	content: string

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	userId: number;

	@BelongsTo(() => User)
	author: User;

}