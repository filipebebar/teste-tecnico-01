import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from '../../database/models/Schedule.schema';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleModelProvider, ScheduleTimeModelProvider } from '../providers/schedule-model.provider';
import { ScheduleTimeRepository } from './schedule-time.repository';
import { ScheduleTimeService } from '../service/schedule-time.service';
import {
  mockFindOne,
  mockMinutesResult,
  mockResultScheduleList,
  mockResultScheduleListComplete,
  mockResultScheduleListCompleteWithAppoitment,
  mockUpdateResult,
} from '../mock/data.mock';
import { schedulesData } from '../../database/populate/dbData';
import { NotFoundException } from '../exception/schedules.exception';
import { ScheduleDTO } from '../dto/schedule.dto';

describe('ScheduleRepository', () => {
  let scheduleRepository: ScheduleRepository;
  let scheduleTimeService: ScheduleTimeService;
  let scheduleModel: Model<Schedule>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleRepository,
        ScheduleTimeRepository,
        ScheduleTimeService,
        ScheduleModelProvider,
        ScheduleTimeModelProvider,
      ],
    }).compile();

    scheduleRepository = module.get<ScheduleRepository>(ScheduleRepository);
    scheduleTimeService = module.get<ScheduleTimeService>(ScheduleTimeService);
    scheduleModel = module.get<Model<Schedule>>(getModelToken(Schedule.name));
  });

  it('should be defined', () => {
    expect(scheduleRepository).toBeDefined();
  });

  it('should call findAllUnreserved', async () => {
    jest.spyOn(scheduleTimeService, 'getMinutes').mockResolvedValue(mockMinutesResult);
    jest.spyOn(scheduleModel, 'find').mockResolvedValue(schedulesData);
    jest.spyOn(scheduleRepository, 'mountListUpdated').mockResolvedValue(mockResultScheduleList);

    const result = await scheduleRepository.findAllUnreserved();

    expect(result).toEqual(mockResultScheduleList);
  });

  it('should handle not found schedules', async () => {
    jest.spyOn(scheduleModel, 'find').mockResolvedValue([]);

    try {
      await scheduleRepository.findAllUnreserved();
    } catch (e) {
      expect(NotFoundException).toBe(NotFoundException);
    }
  });

  it('should call updateToReserve', async () => {
    const slotId = 'slot1';

    jest.spyOn(scheduleModel, 'updateOne').mockResolvedValue(mockUpdateResult);

    const result = await scheduleRepository.updateToReserve(slotId);

    expect(result).toBe(true);
  });

  it('should call updateToUnbook', async () => {
    const slotId = 'slot1';

    // Configurar o mock para retornar um valor que faz a função retornar 'false'
    jest.spyOn(scheduleModel, 'updateOne').mockReturnValue({ nModified: 0 } as any);

    await scheduleRepository.updateToUnbook(slotId);

    expect(scheduleModel.updateOne).toHaveBeenCalledWith({ slotId: slotId }, { $set: { reserved: false } });
  });

  it('should try update schedule to unbook', async () => {
    const slotId = 'slot1';

    jest.spyOn(scheduleModel, 'findOneAndUpdate').mockResolvedValue(mockUpdateResult);

    const result = await scheduleRepository.updateToReserve(slotId);

    expect(result).toBe(false);
  });

  it('should call findOneBySlotId', async () => {
    const slotId = 'slot1';

    jest.spyOn(scheduleModel, 'findOne').mockResolvedValue(mockFindOne);

    const result = await scheduleRepository.findOneBySlotId(slotId);

    expect(result).toBe(false);
  });

  it('should call mountListUpdated', async () => {
    jest.spyOn(scheduleTimeService, 'getMinutes').mockResolvedValue(mockMinutesResult);
    const result = await scheduleRepository.mountListUpdated(mockResultScheduleListComplete);

    expect(result).toEqual(mockResultScheduleList as unknown as ScheduleDTO);
  });

  it('should call mountListUpdated and update some schedules', async () => {
    const newScheduleList = mockResultScheduleListCompleteWithAppoitment.map((item) => {
      const newSchedule = { ...item };

      if (newSchedule.lastAppointment instanceof Date && !isNaN(newSchedule.lastAppointment as any)) {
        newSchedule.lastAppointment.setMinutes(newSchedule.lastAppointment.getMinutes() - 10);
      }

      return newSchedule;
    });

    jest.spyOn(scheduleTimeService, 'getMinutes').mockResolvedValue(mockMinutesResult);
    const result = await scheduleRepository.mountListUpdated(newScheduleList);

    expect(result).toEqual(mockResultScheduleList as unknown as ScheduleDTO);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
