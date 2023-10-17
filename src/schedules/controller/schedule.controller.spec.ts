import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleReserveService } from '../service/schedule-reserve.service';
import { ScheduleConfirmService } from '../service/schedule-confirm.service';
import { ScheduleCancelService } from '../service/schedule-cancel.service';
import { ScheduleTimeService } from '../service/schedule-time.service';
import { schedulesData } from '../../database/populate/dbData';
import {
  mockCancelResponse,
  mockConfirmResponse,
  mockResponse,
  mockScheduleCancelRequest,
  mockScheduleConfirmRequest,
  mockScheduleRequest,
} from '../mock/data.mock';
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
  let scheduleController: ScheduleController;
  let scheduleService: ScheduleService;
  let scheduleReserveService: ScheduleReserveService;
  let scheduleConfirmService: ScheduleConfirmService;
  let scheduleCancelService: ScheduleCancelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        ScheduleService,
        ScheduleReserveService,
        ScheduleConfirmService,
        ScheduleCancelService,
        ScheduleTimeService,
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

    scheduleController = module.get<ScheduleController>(ScheduleController);
    scheduleService = module.get<ScheduleService>(ScheduleService);
    scheduleReserveService = module.get<ScheduleReserveService>(ScheduleReserveService);
    scheduleConfirmService = module.get<ScheduleConfirmService>(ScheduleConfirmService);
    scheduleCancelService = module.get<ScheduleCancelService>(ScheduleCancelService);
  });

  it('should be defined', () => {
    expect(scheduleController).toBeDefined();
  });

  it('should create a schedule reserve', async () => {
    jest.spyOn(scheduleReserveService, 'createReserve').mockResolvedValue(mockResponse);

    const response = await scheduleController.createReserve(mockScheduleRequest);
    expect(response).toEqual(mockResponse);
  });

  it('should create a schedule confirmation', async () => {
    jest.spyOn(scheduleConfirmService, 'createScheduleConfirm').mockResolvedValue(mockConfirmResponse);

    const response = await scheduleController.createScheduleConfirm(mockScheduleConfirmRequest);
    expect(response).toEqual(mockConfirmResponse);
  });

  it('should cancel a schedule', async () => {
    jest.spyOn(scheduleCancelService, 'scheduleCancel').mockResolvedValue(mockCancelResponse);

    const response = await scheduleController.scheduleCancel(mockScheduleCancelRequest);
    expect(response).toEqual(mockCancelResponse);
  });

  it('should return list of schedules', async () => {
    const mockResultList = schedulesData;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(scheduleService, 'findAllSchedules').mockResolvedValue(mockResultList);

    const response = await scheduleController.findAll();
    expect(response).toEqual(mockResultList);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
