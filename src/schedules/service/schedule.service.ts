import { Injectable } from '@nestjs/common';
import { DataBaseListException, DataBaseUpdateException } from '../exception/schedules.exception';
import { ScheduleRepository } from '../repository/schedule.repository';

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async findAllSchedules() {
    try {
      return await this.scheduleRepository.findAllUnreserved();
    } catch (e) {
      throw new DataBaseListException();
    }
  }

  async updateScheduleToReserve(slotId) {
    const result = await this.scheduleRepository.findOneBySlotId(slotId);
    try {
      if (!result) {
        await this.scheduleRepository.updateToReserve(slotId);
        return true;
      }
      return false;
    } catch (e) {
      throw new DataBaseUpdateException();
    }
  }
}
