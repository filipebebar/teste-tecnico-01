import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ScheduleConfirm } from '../../database/models/Schedule-confirm.schema';
import { CancelException, DataBaseGetOneException } from '../exception/schedules.exception';

@Injectable()
export class ScheduleCancelService {
  constructor(@InjectModel(ScheduleConfirm.name) private scheduleConfirmModel: Model<ScheduleConfirm>) {}

  async scheduleCancel(scheduleCancelRequest) {
    const { scheduleId } = scheduleCancelRequest;
    try {
      const result = await this.findOneScheduleByScheduleId(scheduleId);
      if (result) {
        const updated = await this.scheduleConfirmModel
          .updateOne({ scheduleId: scheduleId }, { $set: { status: 'CANCELED' } })
          .exec();

        if (updated.modifiedCount === 1) {
          const resultAfterUpdated = await this.findOneScheduleByScheduleId(scheduleId);

          return {
            scheduleId: resultAfterUpdated.scheduleId,
            status: resultAfterUpdated.status,
          };
        }
      }
    } catch (e) {
      throw new CancelException();
    }
  }

  async findOneScheduleByScheduleId(scheduleId) {
    try {
      const result = await this.scheduleConfirmModel.findOne({ scheduleId: scheduleId });
      return result;
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }
}
