import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleReserve } from '../../database/models/Schedule-reserve.schema';

export class ScheduleReserveRepository {
  constructor(@InjectModel(ScheduleReserve.name) private scheduleReserveModel: Model<ScheduleReserve>) {}

  async findOneByReserveId(reserveId) {
    const result = await this.scheduleReserveModel.findOne({ reserveId: reserveId });
    return result;
  }
}
