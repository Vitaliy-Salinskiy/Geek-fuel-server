import { Column, DataType, Table, Model, HasMany, BelongsToMany } from "sequelize-typescript";

import { Post } from "../../posts/models/posts.model";
import { Like } from "../../posts/models/like.model"
import { Role } from "src/roles/model/roles.model";
import { UserRoles } from "src/roles/model/user-roles.model";

interface UserCreationAttrs {
	username: string;
	password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs>{

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	username: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@HasMany(() => Post)
	posts: Post[];

	@HasMany(() => Like)
	likes: Like[];

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]

}