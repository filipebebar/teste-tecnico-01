import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleConfirm } from '../../database/models/Schedule-confirm.schema';
import { Guid } from 'guid-typescript';

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

  async findOneByReserveId(reserveId) {
    const result = await this.scheduleConfirmModel.findOne({ reserveId: reserveId });
    return result;
  }

  async create(scheduleConfirmRequest) {
    scheduleConfirmRequest.status = 'CONFIRMED';
    scheduleConfirmRequest.scheduleId = Guid.create();
    scheduleConfirmRequest.patient.slotId = Guid.create();

    const created = await this.scheduleConfirmModel.create(scheduleConfirmRequest);
    return {
      scheduleId: created.scheduleId,
      status: created.status,
    };
  }
}
