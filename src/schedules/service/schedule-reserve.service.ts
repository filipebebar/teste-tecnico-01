import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleReserve } from '../../database/models/Schedule-reserve.schema';
import { Guid } from 'guid-typescript';
import { Injectable } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { validateScheduleBetweenTime, validateScheduleTime } from '../../utils/validateScheduleTime';
import { ScheduleTimeService } from './schedule-time.service';
import { DataBaseGetOneException, MoreThanOneException, TimeRunOutException } from '../exception/schedules.exception';

@Injectable()
export class ScheduleReserveService {
  constructor(
    @InjectModel(ScheduleReserve.name) private scheduleReserveModel: Model<ScheduleReserve>,
    private readonly scheduleService: ScheduleService,
    private readonly scheduleTimeService: ScheduleTimeService,
  ) {}

  async createReserve(scheduleRequest) {
    const slotId = scheduleRequest.slotId;
    const recoveredTime = await this.scheduleTimeService.getMinutes();

    try {
      const result = await this.recoveryReserveBySlotId(slotId);
      const recoveredSchedule = await this.scheduleService.getReserveBySlotId(result?.slotId);

      if (!result || !recoveredSchedule) {
        scheduleRequest.reserveId = Guid.create();
        const created = await this.scheduleReserveModel.create(scheduleRequest);
        await this.scheduleService.updateScheduleToReserve(slotId);

        return { reserveId: created.reserveId };
      }

      const betweenMinutes = validateScheduleBetweenTime(result.scheduledTime, recoveredTime.minutes);

      if (recoveredSchedule && betweenMinutes) {
        return new MoreThanOneException();
      }

      const passMinutes = validateScheduleTime(result.scheduledTime, recoveredTime.minutes);

      if (passMinutes) {
        await this.scheduleService.updateScheduleToUnbook(slotId);
        return new TimeRunOutException();
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async recoveryReserveBySlotId(slotId) {
    try {
      const result = await this.scheduleReserveModel.findOne({ slotId: slotId });
      return result;
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }

  async findOneScheduleByReserveId(reserveId) {
    try {
      return this.scheduleReserveModel.findOne({ reserveId: reserveId });
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }
}
