import { Injectable } from '@nestjs/common';
import { validateScheduleBetweenTime, validateScheduleTime } from '../../utils/validateScheduleTime';
import { ScheduleTimeService } from './schedule-time.service';
import { AlreadyHaveException, DataBaseGetOneException, TimeRunOutException } from '../exception/schedules.exception';
import { ScheduleRepository } from '../repository/schedule.repository';
import { ScheduleReserveRepository } from '../repository/schedule-reserve.repository';
import { ScheduleConfirmRepository } from '../repository/schedule-confirm.repository';

@Injectable()
export class ScheduleConfirmService {
  constructor(
    private readonly scheduleTimeService: ScheduleTimeService,
    private readonly scheduleRepository: ScheduleRepository,
    private readonly scheduleReserveRepository: ScheduleReserveRepository,
    private readonly scheduleConfirmRepository: ScheduleConfirmRepository,
  ) {}

  async createScheduleConfirm(scheduleConfirmRequest) {
    try {
      const result = await this.recoveryScheduleConfirmation(scheduleConfirmRequest.reserveId);

      if (result) {
        return new AlreadyHaveException();
      }

      const reservedResult = await this.recoveryReserve(scheduleConfirmRequest.reserveId);
      const recoveredTime = await this.scheduleTimeService.getMinutes();
      const betweenMinutes = validateScheduleBetweenTime(reservedResult.scheduledTime, recoveredTime.minutes);

      if (!result && betweenMinutes) {
        return await this.scheduleConfirmRepository.create(scheduleConfirmRequest);
      }

      const passMinutes = validateScheduleTime(reservedResult.scheduledTime, recoveredTime.minutes);

      if (passMinutes) {
        await this.scheduleRepository.updateToUnbook(reservedResult.slotId);
        return new TimeRunOutException();
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async recoveryScheduleConfirmation(reserveId) {
    try {
      const result = await this.scheduleConfirmRepository.findOneByReserveId(reserveId);
      return result;
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }

  async recoveryReserve(reserveId) {
    try {
      const result = await this.scheduleReserveRepository.findOneByReserveId(reserveId);
      return result;
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }
}
