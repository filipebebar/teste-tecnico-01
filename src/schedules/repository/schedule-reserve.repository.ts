import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleReserve } from '../../database/models/Schedule-reserve.schema';
import { Guid } from 'guid-typescript';

export class ScheduleReserveRepository {
  constructor(@InjectModel(ScheduleReserve.name) private scheduleReserveModel: Model<ScheduleReserve>) {}

  async findOneByReserveId(reserveId) {
    const result = await this.scheduleReserveModel.findOne({ reserveId: reserveId });
    return result;
  }

  async findOneBySlotId(slotId) {
    const result = await this.scheduleReserveModel.findOne({ slotId: slotId });
    return result;
  }

  async create(scheduleRequest) {
    scheduleRequest.reserveId = Guid.create();
    return this.scheduleReserveModel.create(scheduleRequest);
  }
}
