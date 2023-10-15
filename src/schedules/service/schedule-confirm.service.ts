import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ScheduleConfirm } from '../../database/models/Schedule-confirm.schema';
import { Guid } from 'guid-typescript';
import { ScheduleReserveService } from './schedule-reserve.service';
import { validateScheduleBetweenTime, validateScheduleTime } from '../../utils/validateScheduleTime';
import { ScheduleTimeService } from './schedule-time.service';
import { ScheduleService } from './schedule.service';
import { AlreadyHaveException, DataBaseGetOneException, TimeRunOutException } from '../exception/schedules.exception';

@Injectable()
export class ScheduleConfirmService {
  constructor(
    @InjectModel(ScheduleConfirm.name) private scheduleConfirmModel: Model<ScheduleConfirm>,
    private readonly scheduleReserveService: ScheduleReserveService,
    private readonly scheduleTimeService: ScheduleTimeService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async createScheduleConfirm(scheduleConfirmRequest) {
    try {
      const result = await this.getScheduleConfirmationByScheduleId(scheduleConfirmRequest.reserveId);

      if (result) {
        return new AlreadyHaveException();
      }

      const reservedResult = await this.recoveryReserveByReserveId(scheduleConfirmRequest.reserveId);
      const recoveredTime = await this.scheduleTimeService.getMinutes();
      const betweenMinutes = validateScheduleBetweenTime(reservedResult.scheduledTime, recoveredTime.minutes);

      if (!result && betweenMinutes) {
        scheduleConfirmRequest.status = 'CONFIRMED';
        scheduleConfirmRequest.scheduleId = Guid.create();
        scheduleConfirmRequest.patient.slotId = Guid.create();

        const created = await this.scheduleConfirmModel.create(scheduleConfirmRequest);
        return {
          scheduleId: created.scheduleId,
          status: created.status,
        };
      }

      const passMinutes = validateScheduleTime(reservedResult.scheduledTime, recoveredTime.minutes);

      if (passMinutes) {
        await this.scheduleService.updateScheduleToUnbook(reservedResult.slotId);
        return new TimeRunOutException();
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async getScheduleConfirmationByScheduleId(reserveId) {
    try {
      const result = await this.scheduleConfirmModel.findOne({ reserveId: reserveId });
      return result;
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }

  async recoveryReserveByReserveId(reserveId) {
    try {
      const result = await this.scheduleReserveService.findOneScheduleByReserveId(reserveId);
      return result;
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }
}
