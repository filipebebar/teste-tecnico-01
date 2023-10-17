import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleReserve } from '../../database/models/Schedule-reserve.schema';
import { Guid } from 'guid-typescript';
import { Injectable } from '@nestjs/common';
import { validateScheduleBetweenTime, validateScheduleTime } from '../../utils/validateScheduleTime';
import { ScheduleTimeService } from './schedule-time.service';
import { DataBaseGetOneException, MoreThanOneException, TimeRunOutException } from '../exception/schedules.exception';
import { ScheduleRepository } from '../repository/schedule.repository';

@Injectable()
export class ScheduleReserveService {
  constructor(
    @InjectModel(ScheduleReserve.name) private scheduleReserveModel: Model<ScheduleReserve>,
    private readonly scheduleTimeService: ScheduleTimeService,
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async createReserve(scheduleRequest) {
    const slotId = scheduleRequest.slotId;
    const recoveredTime = await this.scheduleTimeService.getMinutes();

    try {
      const result = await this.recoveryReserveBySlotId(slotId);
      const recoveredSchedule = await this.scheduleRepository.findOneBySlotId(result?.slotId);

      if (!result || !recoveredSchedule) {
        scheduleRequest.reserveId = Guid.create();
        const created = await this.scheduleReserveModel.create(scheduleRequest);
        await this.scheduleRepository.updateToReserve(slotId);

        return { reserveId: created.reserveId };
      }

      const betweenMinutes = validateScheduleBetweenTime(result.scheduledTime, recoveredTime.minutes);

      if (recoveredSchedule && betweenMinutes) {
        return new MoreThanOneException();
      }

      const passMinutes = validateScheduleTime(result.scheduledTime, recoveredTime.minutes);

      if (passMinutes) {
        await this.scheduleRepository.updateToReserve(slotId);
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
}
