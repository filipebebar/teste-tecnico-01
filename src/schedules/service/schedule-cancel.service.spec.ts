import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleCancelService } from './schedule-cancel.service';
import { ProviderServiceList } from '../providers/scheduleModelProvider';

describe('ScheduleCancelService', () => {
  let scheduleCancelService: ScheduleCancelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: ProviderServiceList,
    }).compile();

    scheduleCancelService = module.get<ScheduleCancelService>(ScheduleCancelService);
  });

  it('should be defined', () => {
    expect(scheduleCancelService).toBeDefined();
  });

  // it('should cancel a schedule', async () => {
  //   const scheduleCancelRequest = {
  //     scheduleId: 'exampleScheduleId',
  //   };
  //
  //   const updateResult = {
  //     acknowledged: true,
  //     matchedCount: 1,
  //     modifiedCount: 1,
  //     upsertedCount: 0,
  //     upsertedId: null,
  //   };
  //
  //   const findOneResultBeforeUpdate = {
  //     scheduleId: 'exampleScheduleId',
  //     status: 'CONFIRMED',
  //   };
  //
  //   const findOneResultAfterUpdate = {
  //     scheduleId: 'exampleScheduleId',
  //     status: 'CANCELED',
  //   };
  //
  //   jest
  //     .spyOn(scheduleConfirmModel, 'findOne')
  //     .mockResolvedValueOnce(findOneResultBeforeUpdate)
  //     .mockResolvedValueOnce(findOneResultAfterUpdate);
  //   jest.spyOn(scheduleConfirmModel, 'updateOne').mockResolvedValue(updateResult);
  //
  //   const result = await scheduleCancelService.scheduleCancel(scheduleCancelRequest);
  //
  //   expect(result).toEqual({
  //     scheduleId: 'exampleScheduleId',
  //     status: 'CANCELED',
  //   });
  // });
  //
  // it('should handle cancel exception', async () => {
  //   const scheduleCancelRequest = {
  //     scheduleId: 'exampleScheduleId',
  //   };
  //
  //   const findOneResultBeforeUpdate = {
  //     scheduleId: 'exampleScheduleId',
  //     status: 'CONFIRMED',
  //   };
  //
  //   jest.spyOn(scheduleConfirmModel, 'findOne').mockResolvedValueOnce(findOneResultBeforeUpdate);
  //
  //   try {
  //     await scheduleCancelService.scheduleCancel(scheduleCancelRequest);
  //     fail('Should throw an exception');
  //   } catch (e) {
  //     expect(e).toBeInstanceOf(CancelException);
  //   }
  // });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
