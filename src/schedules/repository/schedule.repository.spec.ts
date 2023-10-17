// import { Test, TestingModule } from '@nestjs/testing';
// import { getModelToken } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { ScheduleService } from './schedule.service';
// import { Schedule } from '../../database/models/Schedule.schema';
// import { NotFoundException } from '../exception/schedules.exception';
// import { mockUpdateResult } from '../mock/data.mock';
//
// describe('ScheduleService', () => {
//     let scheduleService: ScheduleService;
//     let scheduleModel: Model<Schedule>;
//
//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 ScheduleService,
//                 {
//                     provide: getModelToken(Schedule.name),
//                     useValue: {
//                         find: jest.fn(),
//                         updateOne: jest.fn(),
//                         findOne: jest.fn(),
//                     },
//                 },
//             ],
//         }).compile();
//
//         scheduleService = module.get<ScheduleService>(ScheduleService);
//         scheduleModel = module.get<Model<Schedule>>(getModelToken(Schedule.name));
//     });
//
//     it('should be defined', () => {
//         expect(scheduleService).toBeDefined();
//     });
//
//     it('should find all schedules', async () => {
//         const foundSchedules = [
//             { slotId: 'slot1', reserved: false },
//             { slotId: 'slot2', reserved: false },
//         ];
//
//         jest.spyOn(scheduleModel, 'find').mockResolvedValue(foundSchedules);
//
//         const result = await scheduleService.findAllSchedules();
//
//         expect(result).toEqual(foundSchedules);
//     });
//
//     it('should handle not found schedules', async () => {
//         jest.spyOn(scheduleModel, 'find').mockResolvedValue([]);
//
//         try {
//             await scheduleService.findAllSchedules();
//         } catch (e) {
//             expect(NotFoundException).toBe(NotFoundException);
//         }
//     });
//
//     it('should update schedule to reserve', async () => {
//         const slotId = 'slot1';
//
//         jest.spyOn(scheduleService, 'getReserveBySlotId').mockReturnValue(null);
//         jest.spyOn(scheduleModel, 'updateOne').mockResolvedValue(mockUpdateResult);
//
//         const result = await scheduleService.updateScheduleToReserve(slotId);
//
//         expect(result).toBe(true);
//     });
//
//     it('should try update schedule to reserve and return false', async () => {
//         const slotId = 'slot1';
//
//         jest.spyOn(scheduleService, 'getReserveBySlotId').mockReturnValue(true as any);
//
//         const result = await scheduleService.updateScheduleToReserve(slotId);
//
//         expect(result).toBe(false);
//     });
//
//     it('should try update schedule to unbook', async () => {
//         const slotId = 'slot1';
//
//         jest.spyOn(scheduleModel, 'updateOne').mockResolvedValue(mockUpdateResult);
//
//         const result = await scheduleService.updateScheduleToUnbook(slotId);
//
//         expect(result).toBe(true);
//     });
//
//     it('should find reserve by slotIt and return value', async () => {
//         const slotId = '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e';
//         const mockResultFind = {
//             slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
//             startDate: '2023-10-14T09:00:00.068Z',
//             endDate: '2023-10-14T09:30:00.068Z',
//             reserved: false,
//         };
//
//         jest.spyOn(scheduleModel, 'findOne').mockResolvedValue(mockResultFind as any);
//
//         const result = await scheduleService.getReserveBySlotId(slotId);
//
//         expect(result).toBe(false);
//     });
//
//     it('should find reserve by slotIt and return null because of undefined slotId', async () => {
//         const slotId = undefined;
//
//         const result = await scheduleService.getReserveBySlotId(slotId);
//
//         expect(result).toBe(null);
//     });
//
//     afterAll(() => {
//         jest.restoreAllMocks();
//     });
// });
