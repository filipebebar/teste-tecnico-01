import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleReserveService } from '../service/schedule-reserve.service';
import { ScheduleCancelRequestDTO, ScheduleConfirmRequestDTO, ScheduleRequestDTO } from '../dto/schedule.dto';
import { ScheduleConfirmService } from '../service/schedule-confirm.service';
import { ScheduleCancelService } from '../service/schedule-cancel.service';

@Controller('schedules')
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly scheduleReserveService: ScheduleReserveService,
    private readonly scheduleConfirmService: ScheduleConfirmService,
    private readonly scheduleCancelService: ScheduleCancelService,
  ) {}

  @Get('/')
  async findAll() {
    return await this.scheduleService.findAllSchedules();
  }

  @Post('/')
  async createReserve(@Body() scheduleRequest: ScheduleRequestDTO) {
    return await this.scheduleReserveService.createReserve(scheduleRequest);
  }

  @Post('/confirm')
  async createScheduleConfirm(@Body() scheduleConfirmRequest: ScheduleConfirmRequestDTO) {
    return await this.scheduleConfirmService.createScheduleConfirm(scheduleConfirmRequest);
  }

  @Post('/cancel')
  async scheduleCancel(@Body() scheduleCancelRequest: ScheduleCancelRequestDTO) {
    return await this.scheduleCancelService.scheduleCancel(scheduleCancelRequest);
  }
}
