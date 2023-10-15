import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleTimeService } from '../service/schedule-time.service';
import { ScheduleTimeRequestDTO } from '../dto/schedule-util.dto';

@Controller('utils')
export class ScheduleUtilController {
  constructor(private readonly scheduleTimeService: ScheduleTimeService) {}

  @Get('/time')
  async findAll() {
    return await this.scheduleTimeService.getMinutes();
  }

  @Post('/time')
  async createReserve(@Body() scheduleTimeRequest: ScheduleTimeRequestDTO) {
    return await this.scheduleTimeService.updateTimeSchedule(scheduleTimeRequest);
  }
}
