import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';
import * as serveStatic from 'serve-static';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe())
	app.use(cookieParser());

	const config = new DocumentBuilder()
		.setTitle("Geek Fuel API")
		.setDescription("REST API Documentation")
		.setVersion("1.0")
		.addTag("Geek Fuel")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/api/docs", app, document)

	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true
	});

	app.use('/uploads', serveStatic('uploads', {
		maxAge: '1d',
		extensions: ["webp"]
	}));

	await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

bootstrap();