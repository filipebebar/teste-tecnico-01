import { Injectable } from '@nestjs/common';
import { CancelException } from '../exception/schedules.exception';
import { ScheduleConfirmRepository } from '../repository/schedule-confirm.repository';
import { ScheduleReserveRepository } from '../repository/schedule-reserve.repository';
import { ScheduleRepository } from '../repository/schedule.repository';

@Injectable()
export class ScheduleCancelService {
  constructor(
    private readonly scheduleConfirmRepository: ScheduleConfirmRepository,
    private readonly scheduleReserveRepository: ScheduleReserveRepository,
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  async scheduleCancel(scheduleCancelRequest) {
    const { scheduleId } = scheduleCancelRequest;
    try {
      const result = await this.scheduleConfirmRepository.findOneByScheduleId(scheduleId);
      if (result) {
        await this.updateScheduleToUnbook(result.reserveId);
        return await this.scheduleConfirmRepository.updateToCancel(scheduleId);
      }
    } catch (e) {
      throw new CancelException();
    }
  }

  async updateScheduleToUnbook(reserveId) {
    try {
      const result = await this.scheduleReserveRepository.findOneByReserveId(reserveId);
      await this.scheduleRepository.updateToUnbook(result.slotId);
    } catch (e) {
      throw new Error(e);
    }
  }
}
