import { Injectable } from '@nestjs/common';
import { DataBaseListException } from '../exception/schedules.exception';
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
}
