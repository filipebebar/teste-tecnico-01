import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTimeService } from './schedule-time.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleTime } from '../../database/models/Schedule-time.schema';
import { DataBaseUpdateException } from '../exception/schedules.exception';

describe('ScheduleTimeService', () => {
  let scheduleTimeService: ScheduleTimeService;
  let scheduleTimeModel: Model<ScheduleTime>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleTimeService,
        {
          provide: getModelToken(ScheduleTime.name),
          useValue: {
            findOne: jest.fn(),
            updateOne: jest.fn(),
          },
        },
      ],
    }).compile();

    scheduleTimeService = module.get<ScheduleTimeService>(ScheduleTimeService);
    scheduleTimeModel = module.get<Model<ScheduleTime>>(getModelToken(ScheduleTime.name));
  });

  it('should be defined', () => {
    expect(scheduleTimeService).toBeDefined();
  });

  it('should get minutes', async () => {
    const expectedResult = {
      slotId: 'exampleSlotId',
      minutes: 60,
    };
    jest.spyOn(scheduleTimeModel, 'findOne').mockResolvedValue(expectedResult);

    const result = await scheduleTimeService.getMinutes();
    expect(result).toEqual(expectedResult);
  });

  it('should update time schedule', async () => {
    const scheduleTimeRequest = {
      slotId: '1dbf9347-f861-4358-b883-2b227bb08fbc',
      minutes: 10,
    };

    const updateResult = {
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedCount: 0,
      upsertedId: null,
    };

    jest.spyOn(scheduleTimeModel, 'updateOne').mockResolvedValue(updateResult);

    const result = await scheduleTimeService.updateTimeSchedule(scheduleTimeRequest);
    expect(result).toEqual('Tempo de reserva de agendamento atualizado com sucesso!');
  });

  it('should handle database update exception', async () => {
    const scheduleTimeRequest = {
      slotId: '1dbf9347-f861-4358-b883-2b227bb08fbc',
      minutes: 10,
    };

    scheduleTimeModel.updateOne(DataBaseUpdateException);

    try {
      await scheduleTimeService.updateTimeSchedule(scheduleTimeRequest);
      fail('Should throw an exception');
    } catch (e) {
      expect(e).toBeInstanceOf(DataBaseUpdateException);
    }
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
