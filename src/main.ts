import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()} with GraphQL playground ${process.env.MODE_DEBUG === 'true' ? 'enabled' : 'disabled'}` );
  console.log(`Expecting Redis server to be available at ${process.env.REDIS_HOST} on port ${process.env.REDIS_PORT}` );
}
bootstrap();
