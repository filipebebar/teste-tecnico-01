import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { ScheduleRepository } from '../repository/schedule.repository';
import { ScheduleTimeService } from './schedule-time.service';
import { ScheduleTimeRepository } from '../repository/schedule-time.repository';
import { ScheduleModelProvider, ScheduleTimeModelProvider } from '../providers/schedule-model.provider';

describe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let scheduleRepository: ScheduleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        ScheduleTimeService,
        ScheduleRepository,
        ScheduleTimeRepository,
        ScheduleModelProvider,
        ScheduleTimeModelProvider,
      ],
    }).compile();

    scheduleService = module.get<ScheduleService>(ScheduleService);
    scheduleRepository = module.get<ScheduleRepository>(ScheduleRepository);
  });

  it('should be defined', () => {
    expect(scheduleService).toBeDefined();
  });

  it('should find all schedules', async () => {
    const foundSchedules = [
      { slotId: 'slot1', reserved: false },
      { slotId: 'slot2', reserved: false },
    ];

    jest.spyOn(scheduleRepository, 'findAllUnreserved').mockResolvedValue(foundSchedules);

    const result = await scheduleService.findAllSchedules();

    expect(result).toEqual(foundSchedules);
  });
});
