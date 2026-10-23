import { Module } from '@nestjs/common';
import { CoreModule } from './core.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './common/errors-handling/filters/custom-exception.filter';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './country/country.module';
import { CitiesModule } from './cities/cities.module';
import { CurrencyModule } from './currency/currency.module';
import { UnitCategoryModule } from './unit-category/unit-category.module';
import { AppSettingsModule } from './app-settings/app-settings.module';
@Module({
  imports: [
    CoreModule,
    AuthModule,
    CountryModule,
    CitiesModule,
    CurrencyModule,
    UnitCategoryModule,
    AppSettingsModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: CustomExceptionFilter }],
})
export class AppModule {}
