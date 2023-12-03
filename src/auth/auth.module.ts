import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthService } from './auth.service';
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersModule } from "../users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: "src/.env"
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>("SECRET_KEY", "qwerty"),
				signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN", "604800s") }
			}),
			inject: [ConfigService],
		}),
		UsersModule,
		PassportModule,
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule { }