import { Injectable } from '@nestjs/common';
import { validateScheduleBetweenTime, validateScheduleTime } from '../../utils/validateScheduleTime';
import { ScheduleTimeService } from './schedule-time.service';
import { DataBaseGetOneException, MoreThanOneException, TimeRunOutException } from '../exception/schedules.exception';
import { ScheduleRepository } from '../repository/schedule.repository';
import { ScheduleReserveRepository } from '../repository/schedule-reserve.repository';

@Injectable()
export class ScheduleReserveService {
  constructor(
    private readonly scheduleTimeService: ScheduleTimeService,
    private readonly scheduleRepository: ScheduleRepository,
    private readonly scheduleReserveRepository: ScheduleReserveRepository,
  ) {}

  async createReserve(scheduleRequest) {
    const slotId = scheduleRequest.slotId;
    const recoveredTime = await this.scheduleTimeService.getMinutes();

    try {
      const result = await this.recoveryReserve(slotId);
      const recoveredSchedule = await this.recoverySchedule(result?.slotId);

      if (!result || !recoveredSchedule) {
        await this.scheduleRepository.updateToReserve(slotId);
        const createdResult = await this.scheduleReserveRepository.create(scheduleRequest);

        return { reserveId: createdResult.reserveId };
      }

      const betweenMinutes = validateScheduleBetweenTime(result.scheduledTime, recoveredTime.minutes);

      if (recoveredSchedule && betweenMinutes) {
        return new MoreThanOneException();
      }

      const passMinutes = validateScheduleTime(result.scheduledTime, recoveredTime.minutes);

      if (passMinutes) {
        await this.scheduleRepository.updateToUnbook(slotId);
        return new TimeRunOutException();
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async recoveryReserve(slotId) {
    try {
      return this.scheduleReserveRepository.findOneBySlotId(slotId);
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }

  async recoverySchedule(slotId) {
    try {
      return await this.scheduleRepository.findOneBySlotId(slotId);
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }
}
