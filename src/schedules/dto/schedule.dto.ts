export class ScheduleRequestDTO {
  slotId: string;
}

export class ScheduleConfirmRequestDTO {
  reserveId: string;
  patient: {
    name: string;
    email: string;
    gender: string;
    birthDate: Date;
  };
}

export class ScheduleCancelRequestDTO {
  scheduleId: string;
}
