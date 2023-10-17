export class ScheduleConfirmRequestDTO {
  reserveId: string;
  patient: {
    name: string;
    email: string;
    gender: string;
    birthDate: Date;
  };
}
