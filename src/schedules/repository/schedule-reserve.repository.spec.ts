import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleReserveModelProvider } from '../providers/schedule-model.provider';
import { ScheduleReserveRepository } from './schedule-reserve.repository';
import { ScheduleReserve } from '../../database/models/Schedule-reserve.schema';

describe('ScheduleReserveRepository', () => {
  let scheduleReserveRepository: ScheduleReserveRepository;
  let scheduleReserveModel: Model<ScheduleReserve>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleReserveRepository, ScheduleReserveModelProvider],
    }).compile();

    scheduleReserveRepository = module.get<ScheduleReserveRepository>(ScheduleReserveRepository);
    scheduleReserveModel = module.get<Model<ScheduleReserve>>(getModelToken(ScheduleReserve.name));
  });

  it('should be defined', () => {
    expect(ScheduleReserveRepository).toBeDefined();
  });

  it('should call findOneByReserveId', async () => {
    const reserveId = '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e';
    const mockResult = {
      reserveId: reserveId,
      slotId: 'bfa52db5-ad23-7716-1049-7fb30ea050b6',
      scheduledTime: new Date('2023-10-17T03:46:28.178Z'),
    };

    jest.spyOn(scheduleReserveModel, 'findOne').mockResolvedValue(mockResult);

    const result = await scheduleReserveRepository.findOneByReserveId(reserveId);

    expect(result).toBe(mockResult);
  });

  it('should call findOneBySlotId', async () => {
    const slotId = '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e';
    const mockResult = {
      reserveId: 'bfa52db5-ad23-7716-1049-7fb30ea050b6',
      slotId: slotId,
      scheduledTime: new Date('2023-10-17T03:46:28.178Z'),
    };

    jest.spyOn(scheduleReserveModel, 'findOne').mockResolvedValue(mockResult);

    const result = await scheduleReserveRepository.findOneBySlotId(slotId);

    expect(result).toBe(mockResult);
  });

  it('should call findOneBySlotId', async () => {
    const slotId = '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e';
    const mockResult = {
      reserveId: 'bfa52db5-ad23-7716-1049-7fb30ea050b6',
      slotId: slotId,
      scheduledTime: new Date('2023-10-17T03:46:28.178Z'),
    };

    jest.spyOn(scheduleReserveModel, 'findOne').mockResolvedValue(mockResult);

    const result = await scheduleReserveRepository.findOneBySlotId(slotId);

    expect(result).toBe(mockResult);
  });

  it('should call create', async () => {
    const slotId = '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e';
    const mockResult = {
      reserveId: 'bfa52db5-ad23-7716-1049-7fb30ea050b6',
      slotId: slotId,
      scheduledTime: new Date('2023-10-17T03:46:28.178Z'),
    };

    jest.spyOn(scheduleReserveModel, 'create').mockResolvedValue(mockResult as any);

    const result = await scheduleReserveRepository.create({ slotId: slotId });

    expect(result).toBe(mockResult);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
