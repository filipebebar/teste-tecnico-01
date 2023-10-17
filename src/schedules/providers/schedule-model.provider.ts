import { getModelToken } from '@nestjs/mongoose';
import { ScheduleCancelService } from '../service/schedule-cancel.service';
import { ScheduleConfirmRepository } from '../repository/schedule-confirm.repository';
import { ScheduleReserveRepository } from '../repository/schedule-reserve.repository';
import { ScheduleRepository } from '../repository/schedule.repository';
import { ScheduleTimeService } from '../service/schedule-time.service';
import { ScheduleTimeRepository } from '../repository/schedule-time.repository';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleReserveService } from '../service/schedule-reserve.service';

const useValue = {
  findOne: jest.fn(),
  updateOne: jest.fn(),
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
};

export const ScheduleModelProvider = {
  provide: getModelToken('Schedule'),
  useValue: useValue,
};
export const ScheduleConfirmModelProvider = {
  provide: getModelToken('ScheduleConfirm'),
  useValue: useValue,
};
export const ScheduleReserveModelProvider = {
  provide: getModelToken('ScheduleReserve'),
  useValue: useValue,
};
export const ScheduleTimeModelProvider = {
  provide: getModelToken('ScheduleTime'),
  useValue: useValue,
};

export const ProvidersList = [
  ScheduleCancelService,
  ScheduleConfirmRepository,
  ScheduleReserveRepository,
  ScheduleRepository,
  ScheduleTimeService,
  ScheduleService,
  ScheduleReserveService,
  ScheduleTimeRepository,
];
