import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('dotenv').config()

const serverport = process.env.SERVER_PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(serverport);
}
bootstrap();
