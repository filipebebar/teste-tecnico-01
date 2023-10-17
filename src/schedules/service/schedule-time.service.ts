import { Injectable } from '@nestjs/common';
import { DataBaseListException, DataBaseUpdateException } from '../exception/schedules.exception';
import { ScheduleTimeRepository } from '../repository/schedule-time.repository';

@Injectable()
export class ScheduleTimeService {
  constructor(private readonly scheduleTimeRepository: ScheduleTimeRepository) {}

  async getMinutes() {
    try {
      return await this.scheduleTimeRepository.findOne();
    } catch (e) {
      throw new DataBaseListException();
    }
  }

  async updateTimeSchedule(scheduleTimeRequest) {
    try {
      await this.scheduleTimeRepository.updateBySlotId(scheduleTimeRequest);
    } catch (e) {
      throw new DataBaseUpdateException();
    }
  }
}
