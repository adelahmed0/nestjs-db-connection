import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    MongoModule,
  ],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
