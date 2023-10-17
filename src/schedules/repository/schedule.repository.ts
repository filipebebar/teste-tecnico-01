import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from '../../database/models/Schedule.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '../exception/schedules.exception';
import { ScheduleDTO } from '../dto/schedule.dto';
import { validateScheduleTime } from '../../utils/validateScheduleTime';
import { ScheduleTimeService } from '../service/schedule-time.service';

export class ScheduleRepository {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
    private readonly scheduleTimeService: ScheduleTimeService,
  ) {}

  async findAllUnreserved() {
    const result = await this.scheduleModel.find();
    if (!result || result.length <= 0) {
      return new NotFoundException();
    }
    return await this.mountListUpdated(result);
  }

  async updateToReserve(slotId) {
    const query = { slotId: slotId };
    const update = { $set: { reserved: true, lastAppointment: new Date() } };

    const doc = await this.scheduleModel.findOneAndUpdate(query, update);

    return !doc;
  }

  async updateToUnbook(slotId) {
    await this.scheduleModel.updateOne({ slotId: slotId }, { $set: { reserved: false } });
  }

  async findOneBySlotId(slotId) {
    if (slotId === undefined) {
      return { result: null };
    }
    const result = await this.scheduleModel.findOne({ slotId: slotId });
    return result.reserved;
  }

  async mountListUpdated(result) {
    const timeNow = await this.scheduleTimeService.getMinutes();
    const treatedList = await result.map((schedule) => {
      if (schedule.lastAppointment) {
        if (validateScheduleTime(schedule.lastAppointment, timeNow.minutes)) {
          this.updateToUnbook(schedule.slotId);
          schedule.reserved = false;
        }
      }
      return schedule;
    });

    const filteredList = treatedList.filter((schedule) => !schedule.reserved);
    return this.mountListToDto(filteredList);
  }

  mountListToDto(treatedList) {
    return treatedList.map(
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
}
