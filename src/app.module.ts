import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from './schedules/schedule.module';
import { MongoLoggerMiddleware } from './middleware/MongoLoggerMiddleware.middleware';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://http://127.0.0.1:27017/local`), ScheduleModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(MongoLoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
