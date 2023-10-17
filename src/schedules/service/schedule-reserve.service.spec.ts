import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleReserveService } from './schedule-reserve.service';
import { ScheduleTimeService } from './schedule-time.service';
import { ScheduleService } from './schedule.service';
import { mockMinutesResult } from '../mock/data.mock';
import { MoreThanOneException, TimeRunOutException } from '../exception/schedules.exception';
import {
  ScheduleConfirmModelProvider,
  ScheduleModelProvider,
  ScheduleReserveModelProvider,
  ScheduleTimeModelProvider,
} from '../providers/schedule-model.provider';
import { ScheduleRepository } from '../repository/schedule.repository';
import { ScheduleReserveRepository } from '../repository/schedule-reserve.repository';
import { ScheduleConfirmRepository } from '../repository/schedule-confirm.repository';
import { ScheduleTimeRepository } from '../repository/schedule-time.repository';

describe('ScheduleReserveService', () => {
  let scheduleReserveService: ScheduleReserveService;
  let scheduleTimeService: ScheduleTimeService;
  let scheduleRepository: ScheduleRepository;
  let scheduleReserveRepository: ScheduleReserveRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleReserveService,
        ScheduleTimeService,
        ScheduleService,
        ScheduleRepository,
        ScheduleReserveRepository,
        ScheduleConfirmRepository,
        ScheduleTimeRepository,
        ScheduleReserveModelProvider,
        ScheduleModelProvider,
        ScheduleTimeModelProvider,
        ScheduleConfirmModelProvider,
      ],
    }).compile();

    scheduleReserveService = module.get<ScheduleReserveService>(ScheduleReserveService);
    scheduleReserveRepository = module.get<ScheduleReserveRepository>(ScheduleReserveRepository);
    scheduleTimeService = module.get<ScheduleTimeService>(ScheduleTimeService);
    scheduleRepository = module.get<ScheduleRepository>(ScheduleRepository);
  });

  it('should be defined', () => {
    expect(scheduleReserveService).toBeDefined();
  });

  it('should create a reserve', async () => {
    const mockScheduleRequest = {
      slotId: 'slot1',
    };

    const mockScheduleResponse = {
      reserveId: 'slot1',
    };

    jest.spyOn(scheduleTimeService, 'getMinutes').mockReturnValue(mockMinutesResult as any);
    jest.spyOn(scheduleReserveService, 'recoveryReserve').mockResolvedValue(null);

    jest.spyOn(scheduleReserveRepository, 'create').mockResolvedValue(mockScheduleResponse as any);

    const result = await scheduleReserveService.createReserve(mockScheduleRequest);

    expect(result).toEqual(mockScheduleResponse);
  });

  it('should try create a reserve but return MoreThanOneException', async () => {
    const mockScheduleRequest = {
      slotId: 'slot1',
    };
    const mockRecoverySchedule = {
      reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      scheduledTime: new Date(),
    };

    jest.spyOn(scheduleTimeService, 'getMinutes').mockReturnValue(mockMinutesResult as any);
    jest.spyOn(scheduleReserveService, 'recoveryReserve').mockResolvedValue(mockRecoverySchedule as any);
    jest.spyOn(scheduleReserveService, 'recoverySchedule').mockResolvedValue(true);

    const result = await scheduleReserveService.createReserve(mockScheduleRequest);

    expect(result).toBeInstanceOf(MoreThanOneException);
  });

  it('should try create a reserve but return TimeRunOutException', async () => {
    const mockScheduleRequest = {
      slotId: 'slot1',
    };
    const mockRecoverySchedule = {
      reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      scheduledTime: new Date(),
    };
    mockRecoverySchedule.scheduledTime.setMinutes(mockRecoverySchedule.scheduledTime.getMinutes() - 10);

    jest.spyOn(scheduleTimeService, 'getMinutes').mockReturnValue(mockMinutesResult as any);
    jest.spyOn(scheduleReserveService, 'recoveryReserve').mockResolvedValue(mockRecoverySchedule as any);
    jest.spyOn(scheduleReserveService, 'recoverySchedule').mockResolvedValue(true);
    jest.spyOn(scheduleRepository, 'updateToUnbook').mockReturnValue(true as any);

    const result = await scheduleReserveService.createReserve(mockScheduleRequest);

    expect(result).toBeInstanceOf(TimeRunOutException);
  });

  it('should call recoveryReserve', async () => {
    const slotId = '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e';
    const mockResultFind = {
      reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      scheduledTime: new Date(),
    };

    jest.spyOn(scheduleReserveRepository, 'findOneBySlotId').mockResolvedValue(mockResultFind as any);

    const result = await scheduleReserveService.recoveryReserve(slotId);

    expect(result).toEqual(mockResultFind);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
