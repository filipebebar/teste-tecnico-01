import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

@Injectable()
export class MongoLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      console.log(`\n Mongoose: ${collectionName}.${method}`, JSON.stringify(query), doc);
    });
    next();
  }
}
