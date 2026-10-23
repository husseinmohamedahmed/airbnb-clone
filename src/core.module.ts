import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from './common/configuration/env-schema-validation';
import configMapping from './common/configuration/config-mapping';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { EnviromentInterface } from './common/configuration/enviroment.interface';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
      load: [configMapping],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          fallbackLanguage: configService.getOrThrow('fallBackLanguage'),
          loaderOptions: {
            path: path.join(__dirname, '/i18n/'),
            watch: true,
          },
        };
      },
      inject: [ConfigService],
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService<EnviromentInterface>) => {
        return { uri: configService.getOrThrow('mongodbUri') };
      },
      inject: [ConfigService],
    }),
  ],
})
export class CoreModule {}
