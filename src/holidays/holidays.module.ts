import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from './holiday.entity';
import { HolidaysService } from './holidays.service';
import { HolidaysController } from './holidays.controller';
import { DateUtilsService } from './date-utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([Holiday])],
  providers: [HolidaysService, DateUtilsService],
  controllers: [HolidaysController],
})
export class HolidaysModule {}
