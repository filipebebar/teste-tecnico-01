import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleTime } from '../../database/models/Schedule-time.schema';

export class ScheduleTimeRepository {
  constructor(@InjectModel(ScheduleTime.name) private scheduleTimeModel: Model<ScheduleTime>) {}

  async findOne() {
    const result = await this.scheduleTimeModel.findOne();
    return {
      slotId: result.slotId,
      minutes: result.minutes,
    };
  }

  async updateBySlotId(scheduleTimeRequest) {
    const { slotId, minutes } = scheduleTimeRequest;
    const result = await this.scheduleTimeModel.updateOne({ slotId: slotId }, { $set: { minutes: minutes } });
    if (result.modifiedCount === 1) {
      return 'Tempo de reserva de agendamento atualizado com sucesso!';
    }
    return 'Nenhum agendamento foi atualizado';
  }
}
