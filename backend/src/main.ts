import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
require("dotenv").config();

async function bootstrap() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN not provided");
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableCors();
  await app.listen(3100);
}
bootstrap();
