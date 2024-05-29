import { Controller, Get, Put, Delete, Param, Body, NotFoundException, ForbiddenException, Post } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { DateUtilsService } from './date-utils.service';

@Controller('feriados')
export class HolidaysController {
  constructor(
    private readonly holidaysService: HolidaysService,
    private readonly dateUtilsService: DateUtilsService,
  ) {}

  @Get(':ibgeCode/:date')
  async getHoliday(@Param('ibgeCode') ibgeCode: string, @Param('date') date: string): Promise<{ name: string }> {
    const holiday = await this.holidaysService.findOne(ibgeCode, date);
    return { name: holiday.name };
  }

  @Put(':ibgeCode/:date')
  async createOrUpdateHoliday(
    @Param('ibgeCode') ibgeCode: string,
    @Param('date') date: string,
    @Body('name') name: string,
  ): Promise<{ name: string }> {
    const holiday = await this.holidaysService.createOrUpdate(ibgeCode, date, name);
    return { name: holiday.name };
  }

  @Put(':ibgeCode/:holidayName')
  async createOrUpdateMobileHoliday(
    @Param('ibgeCode') ibgeCode: string,
    @Param('holidayName') holidayName: string,
  ): Promise<{ name: string }> {
    const year = new Date().getFullYear();
    let date: Date;

    if (holidayName.toLowerCase() === 'carnaval') {
      date = this.dateUtilsService.calculateCarnival(year);
    } else if (holidayName.toLowerCase() === 'corpus-christi') {
      date = this.dateUtilsService.calculateCorpusChristi(year);
    } else if (holidayName.toLowerCase() === 'sexta-feira-santa') {
      date = this.dateUtilsService.calculateGoodFriday(year);
    } else {
      throw new NotFoundException(`Holiday ${holidayName} not found`);
    }

    const dateString = date.toISOString().split('T')[0];
    const holiday = await this.holidaysService.createOrUpdate(ibgeCode, dateString, holidayName);
    return { name: holiday.name };
  }

  @Delete(':ibgeCode/:date')
  async removeHoliday(@Param('ibgeCode') ibgeCode: string, @Param('date') date: string): Promise<void> {
    if (ibgeCode.length === 7) {
      throw new ForbiddenException(`Cannot delete national or state holidays at the municipal level`);
    }
    await this.holidaysService.remove(ibgeCode, date);
  }

  @Post()
  async createHoliday(
    @Body('ibgeCode') ibgeCode: string,
    @Body('date') date: string,
    @Body('name') name: string,
  ): Promise<{ name: string }> {
    const holiday = await this.holidaysService.createHoliday(ibgeCode, date, name);
    return { name: holiday.name };
  }
}
