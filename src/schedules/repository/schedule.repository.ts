import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from '../../database/models/Schedule.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '../exception/schedules.exception';
import { ScheduleDTO } from '../dto/schedule.dto';

export class ScheduleRepository {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<Schedule>) {}

  async findAll() {
    const result = await this.scheduleModel.find({ reserved: false });
    if (!result || result.length <= 0) {
      return new NotFoundException();
    }

    return result.map(
      (schedule) =>
        new ScheduleDTO({
          slotId: schedule.slotId,
          startDate: schedule.startDate,
          endDate: schedule.endDate,
          speciality: {
            slotId: schedule.speciality.slotId,
            name: schedule.speciality.name,
          },
          unit: {
            slotId: schedule.unit.slotId,
            name: schedule.unit.name,
          },
          doctor: {
            slotId: schedule.doctor.slotId,
            name: schedule.doctor.name,
          },
        }),
    );
  }

  async update(slotId) {
    const result = await this.findOneBySlotId(slotId);
    if (!result) {
      await this.scheduleModel.updateOne({ slotId: slotId }, { $set: { reserved: true, lastAppointment: new Date() } });
      return true;
    }
    return false;
  }

  async findOneBySlotId(slotId) {
    if (slotId === undefined) {
      return null;
    }
    const result = await this.scheduleModel.findOne({ slotId: slotId });
    return result.reserved;
  }
}
