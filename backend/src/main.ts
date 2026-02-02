import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { join } from 'node:path';
import { AppModule } from './app.module';
import { customMorganFormat, morganStream, winstonLoggerConfig } from './config/winston';
import { DateService } from './lib/date';
import { RedisIoAdapter } from './shared/adapters/redis-io.adapter';
import { GlobalExceptionFilter } from './shared/filters/global-exceptions.filter';
import { ResponseInterceptor } from './shared/interceptors/response.interceptors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: winstonLoggerConfig,
  });

  app.setGlobalPrefix('api');

  // swagger setup
  const options = new DocumentBuilder()
    .setTitle('Arc One API')
    .setDescription('Arc One API Documentation')
    .setContact('Arc One', 'www.arc-one.com', ' [email protected]')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter JWT token in this format - Bearer YOUR_TOKEN to access protected routes only.',
    })
    .build();

  // create swagger document
  const document = SwaggerModule.createDocument(app, options);

  if (process.env.NODE_ENV !== 'production') {
    SwaggerModule.setup('/api-docs', app, document, {
      yamlDocumentUrl: '/api-docs/swagger.yaml',
      jsonDocumentUrl: '/api-docs/swagger.json',
    });
  }

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // global pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // add redis io adapter for websocket
  app.useWebSocketAdapter(new RedisIoAdapter(app));

  // helmet setup for security
  app.use(helmet());

  // morgan
  app.use(morgan(customMorganFormat, { stream: morganStream }));

  // enable cors
  app.enableCors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' });

  // global interceptors
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(DateService)));

  // global filters
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(DateService)));

  // compression
  app.use(compression());

  // listen
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
