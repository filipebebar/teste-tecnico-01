export class ScheduleDTO {
  slotId: string;
  startDate: Date;
  endDate: Date;
  speciality: {
    slotId: string;
    name: string;
  };
  unit: {
    slotId: string;
    name: string;
  };
  doctor: {
    slotId: string;
    name: string;
  };

  constructor(data: {
    slotId: string;
    startDate: Date;
    endDate: Date;
    speciality: {
      slotId: string;
      name: string;
    };
    unit: {
      slotId: string;
      name: string;
    };
    doctor: {
      slotId: string;
      name: string;
    };
  }) {
    this.slotId = data.slotId;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.speciality = {
      slotId: data.speciality.slotId,
      name: data.speciality.name,
    };
    this.unit = {
      slotId: data.unit.slotId,
      name: data.unit.name,
    };
    this.doctor = {
      slotId: data.doctor.slotId,
      name: data.doctor.name,
    };
  }
}
