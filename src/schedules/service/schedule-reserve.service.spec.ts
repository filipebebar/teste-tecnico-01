import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleReserveService } from './schedule-reserve.service';
import { ScheduleReserve } from '../../database/models/Schedule-reserve.schema';
import { ScheduleTimeService } from './schedule-time.service';
import { ScheduleService } from './schedule.service';
import { mockMinutesResult } from '../mock/data.mock';
import { MoreThanOneException, TimeRunOutException } from '../exception/schedules.exception';

describe('ScheduleReserveService', () => {
  let scheduleReserveService: ScheduleReserveService;
  let scheduleTimeService: ScheduleTimeService;
  let scheduleService: ScheduleService;

  let scheduleReserveModel: Model<ScheduleReserve>;
  const mockScheduleTimeModel = () => jest.fn();
  const mockScheduleModel = () => jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleReserveService,
        ScheduleTimeService,
        ScheduleService,
        {
          provide: getModelToken('ScheduleReserve'),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
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

    scheduleReserveService = module.get<ScheduleReserveService>(ScheduleReserveService);
    scheduleTimeService = module.get<ScheduleTimeService>(ScheduleTimeService);
    scheduleService = module.get<ScheduleService>(ScheduleService);
    scheduleReserveModel = module.get<Model<ScheduleReserve>>(getModelToken(ScheduleReserve.name));
  });

  it('should be defined', () => {
    expect(scheduleReserveService).toBeDefined();
  });

  it('should create a reserve', async () => {
    const scheduleRequest = {
      slotId: 'slot1',
      // Other properties as needed
    };
    jest.spyOn(scheduleTimeService, 'getMinutes').mockReturnValue(mockMinutesResult as any);
    jest.spyOn(scheduleReserveService, 'recoveryReserveBySlotId').mockResolvedValue(null);
    jest.spyOn(scheduleReserveModel, 'create').mockResolvedValue({ reserveId: 'reserve1' } as any);
    jest.spyOn(scheduleService, 'updateScheduleToReserve').mockResolvedValue(true);

    const result = await scheduleReserveService.createReserve(scheduleRequest);

    expect(result).toEqual({ reserveId: 'reserve1' });
  });

  it('should try create a reserve, but already have the same reserve', async () => {
    const scheduleRequest = {
      slotId: 'slot1',
      // Other properties as needed
    };
    const mockResultFind = {
      reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      scheduledTime: new Date(),
    };

    jest.spyOn(scheduleTimeService, 'getMinutes').mockReturnValue(mockMinutesResult as any);
    jest.spyOn(scheduleReserveService, 'recoveryReserveBySlotId').mockResolvedValue(mockResultFind as any);
    jest.spyOn(scheduleService, 'getReserveBySlotId').mockResolvedValue(true);

    const result = await scheduleReserveService.createReserve(scheduleRequest);

    expect(result).toBeInstanceOf(MoreThanOneException);
  });

  it('should try create a reserve, but return TimeRunOutException', async () => {
    const scheduleRequest = {
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      // Other properties as needed
    };
    const mockResultFind = {
      reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      scheduledTime: new Date(),
    };
    mockResultFind.scheduledTime.setMinutes(mockResultFind.scheduledTime.getMinutes() - 10);

    jest.spyOn(scheduleTimeService, 'getMinutes').mockReturnValue(mockMinutesResult as any);
    jest.spyOn(scheduleReserveService, 'recoveryReserveBySlotId').mockResolvedValue(mockResultFind as any);
    jest.spyOn(scheduleService, 'getReserveBySlotId').mockResolvedValue(true);
    jest.spyOn(scheduleService, 'updateScheduleToUnbook').mockReturnValue(true as any);

    const result = await scheduleReserveService.createReserve(scheduleRequest);

    expect(result).toBeInstanceOf(TimeRunOutException);
  });

  it('should recovery schedule By SlotId', async () => {
    const scheduleRequest = {
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
    };
    const mockResultFind = {
      reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      scheduledTime: new Date(),
    };
    mockResultFind.scheduledTime.setMinutes(mockResultFind.scheduledTime.getMinutes() - 10);

    jest.spyOn(scheduleReserveModel, 'findOne').mockResolvedValue(mockResultFind as any);

    const result = await scheduleReserveService.recoveryReserveBySlotId(scheduleRequest);

    expect(result).toEqual(mockResultFind);
  });

  it('should recovery schedule By ReserveId', async () => {
    const scheduleRequest = {
      reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
    };
    const mockResultFind = {
      reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
      slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
      scheduledTime: new Date(),
    };
    mockResultFind.scheduledTime.setMinutes(mockResultFind.scheduledTime.getMinutes() - 10);

    jest.spyOn(scheduleReserveModel, 'findOne').mockResolvedValue(mockResultFind as any);

    const result = await scheduleReserveService.findOneScheduleByReserveId(scheduleRequest);

    expect(result).toEqual(mockResultFind);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
