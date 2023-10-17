import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleTimeService } from '../service/schedule-time.service';
import { ScheduleUtilController } from './schedule-util.controller';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleReserveService } from '../service/schedule-reserve.service';
import { ScheduleConfirmService } from '../service/schedule-confirm.service';
import { ScheduleCancelService } from '../service/schedule-cancel.service';
import { ScheduleRepository } from '../repository/schedule.repository';
import { ScheduleReserveRepository } from '../repository/schedule-reserve.repository';
import { ScheduleConfirmRepository } from '../repository/schedule-confirm.repository';
import { ScheduleTimeRepository } from '../repository/schedule-time.repository';
import {
  ScheduleConfirmModelProvider,
  ScheduleModelProvider,
  ScheduleReserveModelProvider,
  ScheduleTimeModelProvider,
} from '../providers/schedule-model.provider';

describe('ScheduleController', () => {
  let scheduleUtilController: ScheduleUtilController;
  let scheduleTimeService: ScheduleTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleUtilController],
      providers: [
        ScheduleService,
        ScheduleReserveService,
        ScheduleTimeService,
        ScheduleConfirmService,
        ScheduleCancelService,
        ScheduleRepository,
        ScheduleReserveRepository,
        ScheduleConfirmRepository,
        ScheduleTimeRepository,
        ScheduleModelProvider,
        ScheduleReserveModelProvider,
        ScheduleConfirmModelProvider,
        ScheduleTimeModelProvider,
      ],
    }).compile();

    scheduleUtilController = module.get<ScheduleUtilController>(ScheduleUtilController);
    scheduleTimeService = module.get<ScheduleTimeService>(ScheduleTimeService);
  });

  it('should be defined', () => {
    expect(scheduleUtilController).toBeDefined();
  });

  it('should update schedule time', async () => {
    const mockMsgResponse = 'Tempo de reserva de agendamento atualizado com sucesso!';
    const mockRequest = { slotId: '1dbf9347-f861-4358-b883-2b227bb08fbc', minutes: 3 };
    jest.spyOn(scheduleTimeService, 'updateTimeSchedule').mockResolvedValue(mockMsgResponse);

    const response = await scheduleUtilController.createReserve(mockRequest);
    expect(response).toEqual(mockMsgResponse);
  });

  it('should return list of schedule time', async () => {
    const mockResultList = { slotId: '1dbf9347-f861-4358-b883-2b227bb08fbc', minutes: 5 };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(scheduleTimeService, 'getMinutes').mockResolvedValue(mockResultList);

    const response = await scheduleUtilController.findAll();
    expect(response).toEqual(mockResultList);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
