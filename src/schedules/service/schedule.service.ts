import { Model } from 'mongoose';
import { Schedule } from '../../database/models/Schedule.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {
  DataBaseGetOneException,
  DataBaseListException,
  DataBaseUpdateException,
  NotFoundException,
} from '../exception/schedules.exception';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<Schedule>) {}

  async findAllSchedules() {
    try {
      const recovered = await this.scheduleModel.find({ reserved: false });
      if (!recovered || recovered.length <= 0) {
        return new NotFoundException();
      }
      return recovered;
    } catch (e) {
      throw new DataBaseListException();
    }
  }

  async updateScheduleToReserve(slotId) {
    try {
      const result = await this.getReserveBySlotId(slotId);
      if (!result) {
        await this.scheduleModel.updateOne({ slotId: slotId }, { $set: { reserved: true } }).exec();
        return true;
      }
      return false;
    } catch (e) {
      throw new DataBaseUpdateException();
    }
  }

  async updateScheduleToUnbook(slotId) {
    try {
      await this.scheduleModel.updateOne({ slotId: slotId }, { $set: { reserved: false } }).exec();
    } catch (e) {
      throw new DataBaseUpdateException();
    }
  }

  async getReserveBySlotId(slotId) {
    try {
      if (slotId === undefined) {
        return null;
      }
      const result = await this.scheduleModel.findOne({ slotId: slotId });
      return result.reserved;
    } catch (e) {
      throw new DataBaseGetOneException();
    }
  }
}
