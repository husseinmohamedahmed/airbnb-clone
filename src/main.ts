import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnviromentInterface } from './common/configuration/enviroment.interface';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const configSerivce = app.get(ConfigService<EnviromentInterface>);
  const PORT: number = configSerivce.getOrThrow<number>('port');
  const config = new DocumentBuilder()
    .setTitle('Airbnb API clone')
    .setDescription('The Airbnb API description')
    .setVersion('1.0')
    .addTag('Authentication')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      filter: true,
      displayRequestDuration: true,
    },
  });
  await app.listen(PORT);
}
bootstrap();
