import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleReserveService } from '../service/schedule-reserve.service';
import { ScheduleConfirmService } from '../service/schedule-confirm.service';
import { ScheduleCancelService } from '../service/schedule-cancel.service';
import { ScheduleCancelRequestDTO, ScheduleConfirmRequestDTO, ScheduleRequestDTO } from '../dto/schedule.dto';
import { getModelToken } from '@nestjs/mongoose';
import { ScheduleTimeService } from '../service/schedule-time.service';
import { schedulesData } from '../../database/populate/dbData';

describe('ScheduleController', () => {
  let scheduleController: ScheduleController;
  let scheduleService: ScheduleService;
  let scheduleReserveService: ScheduleReserveService;
  let scheduleConfirmService: ScheduleConfirmService;
  let scheduleCancelService: ScheduleCancelService;

  beforeEach(async () => {
    const mockScheduleModel = () => jest.fn();
    const mockScheduleReserveModel = () => jest.fn();
    const mockScheduleConfirmModel = () => jest.fn();
    const mockScheduleTimeModel = () => jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [
        ScheduleService,
        ScheduleReserveService,
        ScheduleConfirmService,
        ScheduleCancelService,
        ScheduleTimeService,
        {
          provide: getModelToken('Schedule'),
          useValue: mockScheduleModel,
        },
        {
          provide: getModelToken('ScheduleReserve'),
          useValue: mockScheduleReserveModel,
        },
        {
          provide: getModelToken('ScheduleConfirm'),
          useValue: mockScheduleConfirmModel,
        },
        {
          provide: getModelToken('ScheduleTime'),
          useValue: mockScheduleTimeModel,
        },
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
    const scheduleRequest: ScheduleRequestDTO = {
      slotId: '1dbf9347-f861-4358-b883-2b227bb08fbc',
    };
    const result = { reserveId: '1dbf9347-f861-4358-b883-2b227bb08f10' }; // Define the expected result

    jest.spyOn(scheduleReserveService, 'createReserve').mockResolvedValue(result);

    const response = await scheduleController.createReserve(scheduleRequest);
    expect(response).toEqual(result);
  });

  it('should create a schedule confirmation', async () => {
    const scheduleConfirmRequest: ScheduleConfirmRequestDTO = {
      reserveId: 'c710fd2b-7dce-3ba0-ffb8-f59158e59085',
      patient: {
        name: 'Dunha',
        email: 'dunha@gmail.com',
        gender: 'M',
        birthDate: new Date('1989-05-19T01:00:00.000Z'),
      },
    };
    const result = {
      scheduleId: '86170d96-39ac-99e5-b0b2-95be41117350',
      status: 'CONFIRMED',
    };

    jest.spyOn(scheduleConfirmService, 'createScheduleConfirm').mockResolvedValue(result);

    const response = await scheduleController.createScheduleConfirm(scheduleConfirmRequest);
    expect(response).toEqual(result);
  });

  it('should cancel a schedule', async () => {
    const scheduleCancelRequest: ScheduleCancelRequestDTO = {
      scheduleId: '160d7602-849d-7936-d638-3ef361beb43d',
    };
    const result = {
      scheduleId: '160d7602-849d-7936-d638-3ef361beb43d',
      status: 'CANCELED',
    };

    jest.spyOn(scheduleCancelService, 'scheduleCancel').mockResolvedValue(result);

    const response = await scheduleController.scheduleCancel(scheduleCancelRequest);
    expect(response).toEqual(result);
  });

  it('should return list of schedules', async () => {
    const result = schedulesData;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(scheduleService, 'findAllSchedules').mockResolvedValue(result);

    const response = await scheduleController.findAll();
    expect(response).toEqual(result);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
