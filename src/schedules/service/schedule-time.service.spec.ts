import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTimeService } from './schedule-time.service';
import { ScheduleTimeRepository } from '../repository/schedule-time.repository';
import { ScheduleTimeModelProvider } from '../providers/scheduleModelProvider';

describe('ScheduleTimeService', () => {
  let scheduleTimeService: ScheduleTimeService;
  let scheduleTimeRepository: ScheduleTimeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleTimeService, ScheduleTimeRepository, ScheduleTimeModelProvider],
    }).compile();

    scheduleTimeService = module.get<ScheduleTimeService>(ScheduleTimeService);
    scheduleTimeRepository = module.get<ScheduleTimeRepository>(ScheduleTimeRepository);
  });

  it('should be defined', () => {
    expect(scheduleTimeService).toBeDefined();
  });

  it('should get minutes', async () => {
    const expectedResult = {
      slotId: 'exampleSlotId',
      minutes: 60,
    };
    jest.spyOn(scheduleTimeRepository, 'findOne').mockResolvedValue(expectedResult);

    const result = await scheduleTimeService.getMinutes();
    expect(result).toEqual(expectedResult);
  });

  it('should update time schedule', async () => {
    const scheduleTimeRequest = {
      slotId: '1dbf9347-f861-4358-b883-2b227bb08fbc',
      minutes: 10,
    };
    const updateResult = 'Tempo de reserva de agendamento atualizado com sucesso!';
    jest.spyOn(scheduleTimeRepository, 'updateBySlotId').mockResolvedValue(updateResult);
    const result = await scheduleTimeService.updateTimeSchedule(scheduleTimeRequest);

    expect(scheduleTimeRepository.updateBySlotId).toHaveBeenCalledWith(scheduleTimeRequest);
    expect(result).toEqual(updateResult);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
