import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
require("dotenv").config();

async function bootstrap() {
  if (!process.env.TOKEN_GITHUB) {
    throw new Error("TOKEN_GITHUB not provided");
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
