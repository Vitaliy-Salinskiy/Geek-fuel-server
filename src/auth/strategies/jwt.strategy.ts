import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService
	) {
		super({
			jwtFromRequest: (req: Request) => {
				let token: null | string = null;
				if (req && req.cookies) {
					token = req.cookies['access_token'];
				}
				return token;
			},
			ignoreExpiration: false,
			secretOrKey: configService.get<string>("SECRET_KEY", "qwerty")
		});
	}

	async validate(payload: any) {
		return { sub: payload.sub, username: payload.username, roles: payload.roles }
	}
}