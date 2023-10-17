import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleTimeModelProvider } from '../providers/schedule-model.provider';
import { ScheduleReserveRepository } from './schedule-reserve.repository';
import { ScheduleTimeRepository } from './schedule-time.repository';
import { ScheduleTime } from '../../database/models/Schedule-time.schema';
import { mockUpdateResultFail, mockUpdateResultOk } from '../mock/data.mock';

describe('ScheduleTimeRepository', () => {
  let scheduleTimeRepository: ScheduleTimeRepository;
  let scheduleTimeModel: Model<ScheduleTime>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleTimeRepository, ScheduleTimeModelProvider],
    }).compile();

    scheduleTimeRepository = module.get<ScheduleTimeRepository>(ScheduleTimeRepository);
    scheduleTimeModel = module.get<Model<ScheduleTime>>(getModelToken(ScheduleTime.name));
  });

  it('should be defined', () => {
    expect(ScheduleReserveRepository).toBeDefined();
  });

  it('should call findOne', async () => {
    const mockResult = {
      slotId: 'slotIdResult',
      minutes: 3,
    };

    jest.spyOn(scheduleTimeModel, 'findOne').mockResolvedValue(mockResult);

    const result = await scheduleTimeRepository.findOne();

    expect(result).toStrictEqual(mockResult);
  });

  it('should call updateBySlotId and return updated', async () => {
    const mockResultMsg = 'Tempo de reserva de agendamento atualizado com sucesso!';
    const mockScheduleTimeReques = {
      slotId: 'exempleSlotId',
      minutes: 4,
    };
    jest.spyOn(scheduleTimeModel, 'updateOne').mockResolvedValue(mockUpdateResultOk);

    const result = await scheduleTimeRepository.updateBySlotId(mockScheduleTimeReques);

    expect(result).toBe(mockResultMsg);
  });

  it('should call updateBySlotId and dont updated', async () => {
    const mockResultMsg = 'Nenhum agendamento foi atualizado';
    const mockScheduleTimeReques = {
      slotId: 'exempleSlotId',
      minutes: 4,
    };
    jest.spyOn(scheduleTimeModel, 'updateOne').mockResolvedValue(mockUpdateResultFail);

    const result = await scheduleTimeRepository.updateBySlotId(mockScheduleTimeReques);

    expect(result).toBe(mockResultMsg);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
