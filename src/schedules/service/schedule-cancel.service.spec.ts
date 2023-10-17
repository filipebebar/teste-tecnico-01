import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleCancelService } from './schedule-cancel.service';
import {
  ScheduleConfirmModelProvider,
  ScheduleModelProvider,
  ScheduleReserveModelProvider,
  ScheduleTimeModelProvider,
} from '../providers/schedule-model.provider';
import { ScheduleConfirmRepository } from '../repository/schedule-confirm.repository';
import { ScheduleReserveRepository } from '../repository/schedule-reserve.repository';
import { ScheduleRepository } from '../repository/schedule.repository';
import { ScheduleTimeService } from './schedule-time.service';
import { ScheduleTimeRepository } from '../repository/schedule-time.repository';
import { CancelException } from '../exception/schedules.exception';

describe('ScheduleCancelService', () => {
  let scheduleCancelService: ScheduleCancelService;
  let scheduleConfirmRepository: ScheduleConfirmRepository;
  let scheduleReserveRepository: ScheduleReserveRepository;
  let scheduleRepository: ScheduleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleCancelService,
        ScheduleTimeService,
        ScheduleConfirmRepository,
        ScheduleReserveRepository,
        ScheduleRepository,
        ScheduleTimeRepository,
        ScheduleConfirmModelProvider,
        ScheduleReserveModelProvider,
        ScheduleModelProvider,
        ScheduleTimeModelProvider,
      ],
    }).compile();

    scheduleCancelService = module.get<ScheduleCancelService>(ScheduleCancelService);
    scheduleConfirmRepository = module.get<ScheduleConfirmRepository>(ScheduleConfirmRepository);
    scheduleReserveRepository = module.get<ScheduleReserveRepository>(ScheduleReserveRepository);
    scheduleRepository = module.get<ScheduleRepository>(ScheduleRepository);
  });

  it('should be defined', () => {
    expect(scheduleCancelService).toBeDefined();
  });

  it('should cancel a schedule', async () => {
    const mockScheduleCancelRequest = {
      scheduleId: 'exampleScheduleId',
    };

    const updateResult = {
      acknowledged: true,
      matchedCount: 1,
      modifiedCount: 1,
      upsertedCount: 0,
      upsertedId: null,
    };

    const findOneResultBeforeUpdate = {
      scheduleId: 'exampleScheduleId',
      status: 'CONFIRMED',
    };

    const findOneResultAfterUpdate = {
      scheduleId: 'exampleScheduleId',
      status: 'CANCELED',
    };

    jest
      .spyOn(scheduleConfirmRepository, 'findOneByScheduleId')
      .mockResolvedValueOnce(findOneResultBeforeUpdate as any);

    jest.spyOn(scheduleCancelService, 'updateScheduleToUnbook').mockResolvedValue(updateResult as any);
    jest.spyOn(scheduleConfirmRepository, 'updateToCancel').mockResolvedValue(findOneResultAfterUpdate as any);

    const result = await scheduleCancelService.scheduleCancel(findOneResultAfterUpdate);

    expect(scheduleConfirmRepository.updateToCancel).toHaveBeenCalledWith(mockScheduleCancelRequest.scheduleId);
    expect(result).toEqual({
      scheduleId: 'exampleScheduleId',
      status: 'CANCELED',
    });
  });

  it('should handle cancel exception', async () => {
    const scheduleCancelRequest = {
      scheduleId: 'exampleScheduleId',
    };

    const findOneResultBeforeUpdate = {
      scheduleId: 'exampleScheduleId',
      status: 'CONFIRMED',
    };

    jest
      .spyOn(scheduleConfirmRepository, 'findOneByScheduleId')
      .mockResolvedValueOnce(findOneResultBeforeUpdate as any);

    jest.spyOn(scheduleReserveRepository, 'findOneByReserveId').mockRejectedValue(findOneResultBeforeUpdate as any);

    try {
      await scheduleCancelService.scheduleCancel(scheduleCancelRequest);
      fail('Should throw an exception');
    } catch (e) {
      expect(e).toBeInstanceOf(CancelException);
    }
  });

  it('should update schedule to unbook', async () => {
    const mockReserveId = 'exemploReserveId';
    const mockSlotId = {
      slotId: 'exemploSlotId',
    };

    jest.spyOn(scheduleReserveRepository, 'findOneByReserveId').mockResolvedValue(mockSlotId as any);
    jest.spyOn(scheduleRepository, 'updateToUnbook').mockResolvedValue(true as any);

    const result = await scheduleCancelService.updateScheduleToUnbook(mockReserveId);

    expect(scheduleReserveRepository.findOneByReserveId).toHaveBeenCalledWith(mockReserveId);
    expect(scheduleRepository.updateToUnbook).toHaveBeenCalledWith(mockSlotId.slotId);

    expect(result).toEqual(undefined);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
