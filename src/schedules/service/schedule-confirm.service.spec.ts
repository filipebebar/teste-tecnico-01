import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleConfirmService } from './schedule-confirm.service';
import { ScheduleTimeService } from './schedule-time.service';
import { ScheduleRepository } from '../repository/schedule.repository';
import { ScheduleReserveRepository } from '../repository/schedule-reserve.repository';
import { ScheduleConfirmRepository } from '../repository/schedule-confirm.repository';
import {
  ScheduleConfirmModelProvider,
  ScheduleModelProvider,
  ScheduleReserveModelProvider,
  ScheduleTimeModelProvider,
} from '../providers/schedule-model.provider';
import { ScheduleTimeRepository } from '../repository/schedule-time.repository';
import {
  mockCreateResult,
  mockMinutesResult,
  mockRecoveryReserveByReserveIdOurSlotIdResult,
  mockScheduleConfirmRequest,
} from '../mock/data.mock';
import { AlreadyHaveException, TimeRunOutException } from '../exception/schedules.exception';

describe('ScheduleConfirmService', () => {
  let scheduleConfirmService: ScheduleConfirmService;
  let scheduleTimeService: ScheduleTimeService;
  let scheduleReserveRepository: ScheduleReserveRepository;
  let scheduleConfirmRepository: ScheduleConfirmRepository;
  let scheduleRepository: ScheduleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleConfirmService,
        ScheduleTimeService,
        ScheduleRepository,
        ScheduleReserveRepository,
        ScheduleConfirmRepository,
        ScheduleTimeRepository,
        ScheduleConfirmModelProvider,
        ScheduleReserveModelProvider,
        ScheduleReserveModelProvider,
        ScheduleModelProvider,
        ScheduleTimeModelProvider,
      ],
    }).compile();

    scheduleConfirmService = module.get<ScheduleConfirmService>(ScheduleConfirmService);
    scheduleTimeService = module.get<ScheduleTimeService>(ScheduleTimeService);
    scheduleReserveRepository = module.get<ScheduleReserveRepository>(ScheduleReserveRepository);
    scheduleConfirmRepository = module.get<ScheduleConfirmRepository>(ScheduleConfirmRepository);
    scheduleRepository = module.get<ScheduleRepository>(ScheduleRepository);
  });

  it('should be defined', () => {
    expect(scheduleConfirmService).toBeDefined();
  });

  it('should call createdScheduleConfirmation and already have result', async () => {
    jest.spyOn(scheduleConfirmService, 'recoveryScheduleConfirmation').mockReturnValue(mockCreateResult as any);

    const result = await scheduleConfirmService.createScheduleConfirm(mockScheduleConfirmRequest);

    expect(result).toBeInstanceOf(AlreadyHaveException);
  });

  it('should create a schedule confirmation', async () => {
    const mockScheduleConfirmRequest = {
      reserveId: 'bfa52db5-ad23-7716-1049-7fb30ea050b6',
      patient: {
        name: 'dunha',
        email: 'dunha@gmail.com',
        gender: 'M',
        birthDate: new Date('1989-05-19T03:46:28.178Z'),
      },
    };

    jest.spyOn(scheduleConfirmService, 'recoveryScheduleConfirmation').mockResolvedValue(null);
    jest.spyOn(scheduleTimeService, 'getMinutes').mockReturnValue(mockMinutesResult as any);
    jest
      .spyOn(scheduleConfirmService, 'recoveryReserve')
      .mockResolvedValue(mockRecoveryReserveByReserveIdOurSlotIdResult as any);
    jest.spyOn(scheduleConfirmRepository, 'create').mockResolvedValue(mockCreateResult as any);

    const createdScheduleConfirmation = await scheduleConfirmService.createScheduleConfirm(mockScheduleConfirmRequest);

    expect(createdScheduleConfirmation).toEqual(mockCreateResult);
  });

  it('should call createdScheduleConfirmation and return TimeRunOutException', async () => {
    const mockRecoveryReserveByReserveIdResultOutTime = {
      reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      scheduledTime: new Date(),
    };
    mockRecoveryReserveByReserveIdResultOutTime.scheduledTime.setMinutes(
      mockRecoveryReserveByReserveIdResultOutTime.scheduledTime.getMinutes() - 10,
    );

    jest.spyOn(scheduleConfirmService, 'recoveryScheduleConfirmation').mockReturnValue(null);
    jest
      .spyOn(scheduleConfirmService, 'recoveryReserve')
      .mockResolvedValue(mockRecoveryReserveByReserveIdResultOutTime as any);
    jest.spyOn(scheduleTimeService, 'getMinutes').mockReturnValue(mockMinutesResult as any);
    jest.spyOn(scheduleRepository, 'updateToUnbook').mockReturnValue(true as any);

    const result = await scheduleConfirmService.createScheduleConfirm(mockScheduleConfirmRequest);

    expect(result).toBeInstanceOf(TimeRunOutException);
  });

  it('should call recoveryReserve', async () => {
    const mockResultRecovey = {
      reserveId: 'bfa52db5-ad23-7716-1049-7fb30ea050b6',
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      scheduledTime: new Date('2023-10-17T03:46:28.178Z'),
    };
    const mockReserveId = 'bfa52db5-ad23-7716-1049-7fb30ea050b6';

    jest.spyOn(scheduleReserveRepository, 'findOneByReserveId').mockResolvedValue(mockResultRecovey as any);

    const result = await scheduleConfirmService.recoveryReserve(mockReserveId);

    expect(result).toEqual(mockResultRecovey);
  });

  it('should call recoveryScheduleConfirmation', async () => {
    const mockResult = {
      reserveId: 'bfa52db5-ad23-7716-1049-7fb30ea050b6',
      scheduleId: '59b7495b-ddc4-84a6-b540-a63533278b2a',
      status: 'CANCELED',
    };
    const mockReserveId = 'bfa52db5-ad23-7716-1049-7fb30ea050b6';

    jest.spyOn(scheduleConfirmRepository, 'findOneByReserveId').mockResolvedValue(mockResult as any);

    const result = await scheduleConfirmService.recoveryScheduleConfirmation(mockReserveId);

    expect(result).toEqual(mockResult);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
