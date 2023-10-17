import mongoose from 'mongoose';
import { DoctorModel, MinutesModel, ScheduleModel, SpecialityModel, UnitModel } from './dbModels';
import { doctorsData, minutesData, schedulesData, specialitiesData, unitsData } from './dbData';

const mongoDBUrl = 'mongodb://http://172.17.0.1:27017/local';

async function populateDatabase() {
  try {
    await mongoose.connect(mongoDBUrl, {});

    const minutes = await MinutesModel.insertMany(minutesData);
    const doctors = await DoctorModel.insertMany(doctorsData);
    const units = await UnitModel.insertMany(unitsData);
    const specialities = await SpecialityModel.insertMany(specialitiesData);
    const schedules = await ScheduleModel.insertMany(schedulesData);

    console.log('Dados doctors inseridos com sucesso.', doctors);
    console.log('Dados units inseridos com sucesso.', units);
    console.log('Dados specialities inseridos com sucesso.', specialities);
    console.log('Dados schedules inseridos com sucesso.', schedules);
    console.log('Dados minutes inseridos com sucesso.', minutes);

    console.log('\n\nDados populados com sucesso!!');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    await mongoose.disconnect();
  }
}

populateDatabase();
