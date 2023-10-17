import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleConfirmModelProvider } from '../providers/schedule-model.provider';
import { ScheduleConfirm } from '../../database/models/Schedule-confirm.schema';
import { ScheduleConfirmRepository } from './schedule-confirm.repository';
import {
  mockCreateResult,
  mockResponseConfirmModel,
  mockScheduleConfirmRequest,
  mockUpdateResult,
} from '../mock/data.mock';

describe('ScheduleConfirmRepository', () => {
  let scheduleConfirmRepository: ScheduleConfirmRepository;
  let scheduleConfirmModel: Model<ScheduleConfirm>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleConfirmRepository, ScheduleConfirmModelProvider],
    }).compile();

    scheduleConfirmRepository = module.get<ScheduleConfirmRepository>(ScheduleConfirmRepository);
    scheduleConfirmModel = module.get<Model<ScheduleConfirm>>(getModelToken(ScheduleConfirm.name));
  });

  it('should be defined', () => {
    expect(scheduleConfirmRepository).toBeDefined();
  });

  it('should call updateToCancel', async () => {
    const scheduleId = '160d7602-849d-7936-d638-3ef361beb43d';

    jest.spyOn(scheduleConfirmModel, 'updateOne').mockReturnValue(mockUpdateResult as any);
    jest.spyOn(scheduleConfirmRepository, 'findOneByScheduleId').mockReturnValue(mockResponseConfirmModel as any);

    const result = await scheduleConfirmRepository.updateToCancel(scheduleId);

    expect(scheduleConfirmModel.updateOne).toHaveBeenCalledWith(
      { scheduleId: scheduleId },
      { $set: { status: 'CANCELED' } },
    );

    expect(result).toEqual(mockResponseConfirmModel);
  });

  it('should call findOneByScheduleId', async () => {
    const scheduleId = 'scheduleId';

    jest.spyOn(scheduleConfirmModel, 'findOne').mockResolvedValue(mockResponseConfirmModel);

    const result = await scheduleConfirmRepository.findOneByScheduleId(scheduleId);

    expect(result).toBe(mockResponseConfirmModel);
  });

  it('should call findOneByReserveId', async () => {
    const reserveId = 'reserveId';

    jest.spyOn(scheduleConfirmModel, 'findOne').mockResolvedValue(mockResponseConfirmModel);

    const result = await scheduleConfirmRepository.findOneByReserveId(reserveId);

    expect(result).toBe(mockResponseConfirmModel);
  });

  it('should call create and confirm reserve', async () => {
    jest.spyOn(scheduleConfirmModel, 'create').mockResolvedValue(mockCreateResult as any);

    const result = await scheduleConfirmRepository.create(mockScheduleConfirmRequest);

    expect(result).toStrictEqual(mockCreateResult);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
