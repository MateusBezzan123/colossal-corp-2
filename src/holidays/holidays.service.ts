import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from './holiday.entity';

@Injectable()
export class HolidaysService {
  constructor(
    @InjectRepository(Holiday)
    private holidaysRepository: Repository<Holiday>,
  ) {}

  async findOne(ibgeCode: string, date: string): Promise<Holiday> {
    const dateObj = new Date(date);
    const holiday = await this.holidaysRepository.findOne({ where: { ibgeCode, date: dateObj } });
    if (!holiday) {
      throw new NotFoundException(`Holiday not found for IBGE code ${ibgeCode} on date ${date}`);
    }
    return holiday;
  }

  async createOrUpdate(ibgeCode: string, date: string, name: string): Promise<Holiday> {
    const dateObj = new Date(date);
    let holiday = await this.holidaysRepository.findOne({ where: { ibgeCode, date: dateObj } });
    if (holiday) {
      holiday.name = name;
    } else {
      holiday = this.holidaysRepository.create({ ibgeCode, date: dateObj, name });
    }
    return this.holidaysRepository.save(holiday);
  }

  async remove(ibgeCode: string, date: string): Promise<void> {
    const dateObj = new Date(date);
    const result = await this.holidaysRepository.delete({ ibgeCode, date: dateObj });
    if (result.affected === 0) {
      throw new NotFoundException(`Holiday not found for IBGE code ${ibgeCode} on date ${date}`);
    }
  }

  async createHoliday(ibgeCode: string, date: string, name: string): Promise<Holiday> {
    const dateObj = new Date(date);
    const holiday = this.holidaysRepository.create({ ibgeCode, date: dateObj, name });
    return this.holidaysRepository.save(holiday);
  }
}
