import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleConfirmService } from './schedule-confirm.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleConfirm } from '../../database/models/Schedule-confirm.schema';
import { ScheduleReserveService } from './schedule-reserve.service';
import { ScheduleTimeService } from './schedule-time.service';
import { ScheduleService } from './schedule.service';
import {
  mockConfirmResponse,
  mockCreateResult,
  mockMinutesResult,
  mockRecoveryReserveByReserveIdOurSlotIdResult,
  mockScheduleConfirmRequest,
} from '../mock/data.mock';
import { AlreadyHaveException, TimeRunOutException } from '../exception/schedules.exception';

describe('ScheduleConfirmService', () => {
  let scheduleConfirmService: ScheduleConfirmService;
  let scheduleTimeService: ScheduleTimeService;
  let scheduleService: ScheduleService;

  let scheduleConfirmModel: Model<ScheduleConfirm>;

  const mockScheduleReserveModel = () => jest.fn();
  const mockScheduleTimeModel = () => jest.fn();
  const mockScheduleModel = () => jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleConfirmService,
        ScheduleReserveService,
        ScheduleTimeService,
        ScheduleService,
        {
          provide: getModelToken('ScheduleConfirm'),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken('ScheduleReserve'),
          useValue: mockScheduleReserveModel,
        },
        {
          provide: getModelToken('ScheduleTime'),
          useValue: mockScheduleTimeModel,
        },
        {
          provide: getModelToken('Schedule'),
          useValue: mockScheduleModel,
        },
      ],
    }).compile();

    scheduleConfirmService = module.get<ScheduleConfirmService>(ScheduleConfirmService);
    scheduleTimeService = module.get<ScheduleTimeService>(ScheduleTimeService);
    scheduleService = module.get<ScheduleService>(ScheduleService);
    scheduleConfirmModel = module.get<Model<ScheduleConfirm>>(getModelToken(ScheduleConfirm.name));
  });

  it('should be defined', () => {
    expect(scheduleConfirmService).toBeDefined();
  });

  it('should create a schedule confirmation', async () => {
    jest.spyOn(scheduleTimeService, 'getMinutes').mockReturnValue(mockMinutesResult as any);
    jest
      .spyOn(scheduleConfirmService, 'recoveryReserve')
      .mockResolvedValue(mockRecoveryReserveByReserveIdOurSlotIdResult as any);
    jest.spyOn(scheduleConfirmModel, 'findOne').mockResolvedValue(null);
    jest.spyOn(scheduleConfirmModel, 'create').mockResolvedValue(mockCreateResult as any);

    const createdScheduleConfirmation = await scheduleConfirmService.createScheduleConfirm(mockScheduleConfirmRequest);

    expect(createdScheduleConfirmation).toEqual(mockConfirmResponse);
  });

  it('should call createdScheduleConfirmation and already have result', async () => {
    jest.spyOn(scheduleConfirmService, 'recoveryScheduleConfirmation').mockReturnValue(mockCreateResult as any);

    const result = await scheduleConfirmService.createScheduleConfirm(mockScheduleConfirmRequest);

    expect(result).toBeInstanceOf(AlreadyHaveException);
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
    jest.spyOn(scheduleService, 'updateScheduleToUnbook').mockReturnValue(true as any);

    const result = await scheduleConfirmService.createScheduleConfirm(mockScheduleConfirmRequest);

    expect(result).toBeInstanceOf(TimeRunOutException);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
