import { Module } from '@nestjs/common';
import { ScheduleController } from './controller/schedule.controller';
import { ScheduleService } from './service/schedule.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from '../database/models/Schedule.schema';
import { ScheduleReserveService } from './service/schedule-reserve.service';
import { ScheduleReserve, ScheduleReserveSchema } from '../database/models/Schedule-reserve.schema';
import { ScheduleConfirmService } from './service/schedule-confirm.service';
import { ScheduleConfirm, ScheduleConfirmSchema } from '../database/models/Schedule-confirm.schema';
import { ScheduleCancelService } from './service/schedule-cancel.service';
import { ScheduleTime, ScheduleTimeSchema } from '../database/models/Schedule-time.schema';
import { ScheduleTimeService } from './service/schedule-time.service';
import { ScheduleUtilController } from './controller/schedule-util.controller';
import { ScheduleRepository } from './repository/schedule.repository';
import { ScheduleConfirmRepository } from './repository/schedule-confirm.repository';
import { ScheduleReserveRepository } from './repository/schedule-reserve.repository';
import { ScheduleTimeRepository } from './repository/schedule-time.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
      { name: ScheduleReserve.name, schema: ScheduleReserveSchema },
      { name: ScheduleConfirm.name, schema: ScheduleConfirmSchema },
      { name: ScheduleTime.name, schema: ScheduleTimeSchema },
    ]),
  ],
  controllers: [ScheduleController, ScheduleUtilController],
  providers: [
    ScheduleService,
    ScheduleReserveService,
    ScheduleConfirmService,
    ScheduleCancelService,
    ScheduleTimeService,
    ScheduleRepository,
    ScheduleConfirmRepository,
    ScheduleReserveRepository,
    ScheduleTimeRepository,
  ],
  exports: [
    ScheduleService,
    ScheduleReserveService,
    ScheduleConfirmService,
    ScheduleCancelService,
    ScheduleTimeService,
    ScheduleRepository,
    ScheduleConfirmRepository,
    ScheduleReserveRepository,
    ScheduleTimeRepository,
  ],
})
export class ScheduleModule {}
