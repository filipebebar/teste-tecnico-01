import { ScheduleRequestDTO } from '../dto/schedule-request.dto';
import { ScheduleConfirmRequestDTO } from '../dto/schedule-confirm-request.dto';
import { ScheduleCancelRequestDTO } from '../dto/schedule-cancel-request.dto';

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

export const mockResponseConfirmModel = {
  scheduleId: '160d7602-849d-7936-d638-3ef361beb43d',
  status: 'CANCELED',
};

export const mockCreateResult = {
  scheduleId: '86170d96-39ac-99e5-b0b2-95be41117350',
  status: 'CONFIRMED',
};

export const mockRecoveryReserveByReserveIdOurSlotIdResult = {
  reserveId: 'f1a8b6d8-a132-25d1-f6b5-5cddd8c93bf7',
  slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
  scheduledTime: new Date(),
};

export const mockMinutesResult = {
  slotId: 'exampleSlotId',
  minutes: 3,
};

export const mockUpdateResult = {
  acknowledged: true,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0,
  upsertedId: null,
};

export const mockResultScheduleList = [
  {
    doctor: {
      name: 'Garibalde Afonso',
      slotId: '71621e15-6611-4014-870d-129c54b6b4c9',
    },
    endDate: '2023-10-14T09:30:00.068Z',
    slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
    speciality: {
      name: 'Ortopedia',
      slotId: '8a5b993d-eb45-48ee-8f4f-4b4976bf40a8',
    },
    startDate: '2023-10-14T09:00:00.068Z',
    unit: {
      name: 'Afonso Pena',
      slotId: '16535468-7884-4136-96a9-bbc17773b8ff',
    },
  },
  {
    doctor: {
      name: 'Naruto',
      slotId: '5497403e-49bf-4629-af09-540daf286272',
    },
    endDate: {},
    slotId: '65530b7b-c790-485d-b66d-2bee14485b4b',
    speciality: {
      name: 'Pediatria',
      slotId: 'a8da6b1c-8488-4a33-9a18-e2ef0259686a',
    },
    startDate: {},
    unit: {
      name: 'Airton Senna',
      slotId: 'e5fdeab6-15b8-4da7-a9ac-afe9adfc6209',
    },
  },
];
export const mockResultScheduleListComplete = [
  {
    doctor: {
      name: 'Garibalde Afonso',
      slotId: '71621e15-6611-4014-870d-129c54b6b4c9',
    },
    endDate: '2023-10-14T09:30:00.068Z',
    slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
    speciality: {
      name: 'Ortopedia',
      slotId: '8a5b993d-eb45-48ee-8f4f-4b4976bf40a8',
    },
    startDate: '2023-10-14T09:00:00.068Z',
    unit: {
      name: 'Afonso Pena',
      slotId: '16535468-7884-4136-96a9-bbc17773b8ff',
    },
    reserved: false,
    lastAppointment: null,
  },
  {
    doctor: {
      name: 'Naruto',
      slotId: '5497403e-49bf-4629-af09-540daf286272',
    },
    endDate: {},
    slotId: '65530b7b-c790-485d-b66d-2bee14485b4b',
    speciality: {
      name: 'Pediatria',
      slotId: 'a8da6b1c-8488-4a33-9a18-e2ef0259686a',
    },
    startDate: {},
    unit: {
      name: 'Airton Senna',
      slotId: 'e5fdeab6-15b8-4da7-a9ac-afe9adfc6209',
    },
    reserved: false,
    lastAppointment: null,
  },
];

export const mockResultScheduleListCompleteWithAppoitment = [
  {
    doctor: {
      name: 'Garibalde Afonso',
      slotId: '71621e15-6611-4014-870d-129c54b6b4c9',
    },
    endDate: '2023-10-14T09:30:00.068Z',
    slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
    speciality: {
      name: 'Ortopedia',
      slotId: '8a5b993d-eb45-48ee-8f4f-4b4976bf40a8',
    },
    startDate: '2023-10-14T09:00:00.068Z',
    unit: {
      name: 'Afonso Pena',
      slotId: '16535468-7884-4136-96a9-bbc17773b8ff',
    },
    reserved: false,
    lastAppointment: null,
  },
  {
    doctor: {
      name: 'Naruto',
      slotId: '5497403e-49bf-4629-af09-540daf286272',
    },
    endDate: {},
    slotId: '65530b7b-c790-485d-b66d-2bee14485b4b',
    speciality: {
      name: 'Pediatria',
      slotId: 'a8da6b1c-8488-4a33-9a18-e2ef0259686a',
    },
    startDate: {},
    unit: {
      name: 'Airton Senna',
      slotId: 'e5fdeab6-15b8-4da7-a9ac-afe9adfc6209',
    },
    reserved: false,
    lastAppointment: new Date(),
  },
];

export const mockFindOne = {
  doctor: {
    name: 'Garibalde Afonso',
    slotId: '71621e15-6611-4014-870d-129c54b6b4c9',
  },
  endDate: '2023-10-14T09:30:00.068Z',
  slotId: '30ae1c40-83ba-40c4-99fa-ddcd6ce39a7e',
  speciality: {
    name: 'Ortopedia',
    slotId: '8a5b993d-eb45-48ee-8f4f-4b4976bf40a8',
  },
  startDate: '2023-10-14T09:00:00.068Z',
  unit: {
    name: 'Afonso Pena',
    slotId: '16535468-7884-4136-96a9-bbc17773b8ff',
  },
  reserved: false,
  lastAppointment: null,
};
