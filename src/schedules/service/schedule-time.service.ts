import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleTime } from '../../database/models/Schedule-time.schema';
import { DataBaseUpdateException } from '../exception/schedules.exception';

@Injectable()
export class ScheduleTimeService {
  constructor(@InjectModel(ScheduleTime.name) private scheduleTimeModel: Model<ScheduleTime>) {}

  async getMinutes() {
    const result = await this.scheduleTimeModel.findOne();
    return {
      slotId: result.slotId,
      minutes: result.minutes,
    };
  }

  async updateTimeSchedule(scheduleTimeRequest) {
    const { slotId, minutes } = scheduleTimeRequest;
    try {
      const result = await this.scheduleTimeModel.updateOne({ slotId: slotId }, { $set: { minutes: minutes } }).exec();
      if (result.modifiedCount === 1) {
        return 'Tempo de reserva de agendamento atualizado com sucesso!';
      }
    } catch (e) {
      throw new DataBaseUpdateException();
    }
  }
}
