import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';
import { Global, Module } from '@nestjs/common';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT:Joi.number().required(),
        MAIL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_TOKEN_EXPIRES_IN: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
        SESSION_SECRET_KEY: Joi.string().required(),
        SESSION_NAME: Joi.string().required(),
        API_URL: Joi.string().required(),
        WEB_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
