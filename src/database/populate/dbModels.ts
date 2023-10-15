import mongoose from 'mongoose';
import { DoctorDocument, DoctorSchema } from '../models/Doctor.schema';
import { UnitDocument, UnitSchema } from '../models/Unit.schema';
import { SpecialityDocument, SpecialitySchema } from '../models/Speciality.schema';
import { ScheduleDocument, ScheduleSchema } from '../models/Schedule.schema';
import { ScheduleTimeDocument, ScheduleTimeSchema } from '../models/Schedule-time.schema';

export const DoctorModel = mongoose.model<DoctorDocument>('Doctor', DoctorSchema);
export const UnitModel = mongoose.model<UnitDocument>('Unit', UnitSchema);
export const SpecialityModel = mongoose.model<SpecialityDocument>('Speciality', SpecialitySchema);
export const ScheduleModel = mongoose.model<ScheduleDocument>('Schedule', ScheduleSchema);
export const MinutesModel = mongoose.model<ScheduleTimeDocument>('ScheduleTime', ScheduleTimeSchema);
