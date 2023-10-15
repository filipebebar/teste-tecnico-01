import { MongoDBException } from '../../utils/exceptions/exceptions';
import { ERROS } from '../../utils/errors/errors';

export class NotFoundException extends MongoDBException {
  constructor() {
    super(ERROS.SCHEDULE.NOT_FOUND_EXCEPTION, ERROS.SCHEDULE.NOT_FOUND_EXCEPTION.statusCode);
  }
}

export class DataBaseUpdateException extends MongoDBException {
  constructor() {
    super(ERROS.MONGO_DB.UPDATE_EXCEPTION, ERROS.MONGO_DB.UPDATE_EXCEPTION.statusCode);
  }
}

export class DataBaseListException extends MongoDBException {
  constructor() {
    super(ERROS.MONGO_DB.GET_LIST_EXCEPTION, ERROS.MONGO_DB.GET_LIST_EXCEPTION.statusCode);
  }
}

export class DataBaseGetOneException extends MongoDBException {
  constructor() {
    super(ERROS.MONGO_DB.GET_ONE_EXCEPTION, ERROS.MONGO_DB.GET_ONE_EXCEPTION.statusCode);
  }
}

export class CancelException extends MongoDBException {
  constructor() {
    super(ERROS.SCHEDULE.CANCEL_EXCEPTION, ERROS.SCHEDULE.CANCEL_EXCEPTION.statusCode);
  }
}

export class AlreadyHaveException extends MongoDBException {
  constructor() {
    super(ERROS.SCHEDULE.ALREADY_HAVE, ERROS.SCHEDULE.ALREADY_HAVE.statusCode);
  }
}

export class TimeRunOutException extends MongoDBException {
  constructor() {
    super(ERROS.SCHEDULE.TIME_HAS_RUN_OUT, ERROS.SCHEDULE.TIME_HAS_RUN_OUT.statusCode);
  }
}

export class MoreThanOneException extends MongoDBException {
  constructor() {
    super(ERROS.SCHEDULE.MORE_THAN_ONE_SAME_TIME, ERROS.SCHEDULE.MORE_THAN_ONE_SAME_TIME.statusCode);
  }
}
