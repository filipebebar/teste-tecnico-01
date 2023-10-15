import { ScheduleCancelRequestDTO, ScheduleConfirmRequestDTO, ScheduleRequestDTO } from '../dto/schedule.dto';

const mockSlotId = '1dbf9347-f861-4358-b883-2b227bb08fbc';
export const mockScheduleRequest: ScheduleRequestDTO = {
  slotId: mockSlotId,
};

export const mockResponse = { reserveId: '1dbf9347-f861-4358-b883-2b227bb08f10' };

export const mockScheduleConfirmRequest: ScheduleConfirmRequestDTO = {
  reserveId: 'c710fd2b-7dce-3ba0-ffb8-f59158e59085',
  patient: {
    name: 'Dunha',
    email: 'dunha@gmail.com',
    gender: 'M',
    birthDate: new Date('1989-05-19T01:00:00.000Z'),
  },
};

export const mockConfirmResponse = {
  scheduleId: '86170d96-39ac-99e5-b0b2-95be41117350',
  status: 'CONFIRMED',
};

export const mockScheduleCancelRequest: ScheduleCancelRequestDTO = {
  scheduleId: '160d7602-849d-7936-d638-3ef361beb43d',
};

export const mockCancelResponse = {
  scheduleId: '160d7602-849d-7936-d638-3ef361beb43d',
  status: 'CANCELED',
};
