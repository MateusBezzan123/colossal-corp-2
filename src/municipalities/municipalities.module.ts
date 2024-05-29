import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipality } from './municipality.entity';
import { MunicipalityService } from './municipality.service';

@Module({
  imports: [TypeOrmModule.forFeature([Municipality])],
  providers: [MunicipalityService],
  exports: [MunicipalityService],
})
export class MunicipalitiesModule {}
