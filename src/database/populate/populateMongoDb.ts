// import mongoose from 'mongoose';
// import { schedulesData } from './dbData';
// import { ScheduleModel } from './dbModels';
//
// const mongoDBUrl = 'mongodb://host.docker.internal:27017/local';
//
// async function populateDatabase() {
//   try {
//     await mongoose.connect(mongoDBUrl, {});
//
//     // const doctors = await DoctorModel.insertMany(doctorsData);
//     // const units = await UnitModel.insertMany(unitsData);
//     // const specialities = await SpecialityModel.insertMany(specialitiesData);
//     const schedules = await ScheduleModel.insertMany(schedulesData);
//
//     // console.log('Dados doctors inseridos com sucesso.', doctors);
//     // console.log('Dados units inseridos com sucesso.', units);
//     // console.log('Dados specialities inseridos com sucesso.', specialities);
//     console.log('Dados schedules inseridos com sucesso.', schedules);
//   } catch (error) {
//     console.error('Erro ao inserir dados:', error);
//   } finally {
//     await mongoose.disconnect();
//   }
// }
//
// populateDatabase();
