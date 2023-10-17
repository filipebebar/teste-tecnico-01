import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleConfirm } from '../../database/models/Schedule-confirm.schema';

export class ScheduleConfirmRepository {
  constructor(@InjectModel(ScheduleConfirm.name) private scheduleConfirmModel: Model<ScheduleConfirm>) {}

  async updateToCancel(scheduleId) {
    const updated = await this.scheduleConfirmModel.updateOne(
      { scheduleId: scheduleId },
      { $set: { status: 'CANCELED' } },
    );
    if (updated.modifiedCount === 1) {
      const resultAfterUpdated = await this.findOneByScheduleId(scheduleId);

      return {
        scheduleId: resultAfterUpdated.scheduleId,
        status: resultAfterUpdated.status,
      };
    }
  }

  async findOneByScheduleId(scheduleId) {
    const result = await this.scheduleConfirmModel.findOne({ scheduleId: scheduleId });
    return result;
  }
}
