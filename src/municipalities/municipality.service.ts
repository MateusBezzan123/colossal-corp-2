import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipality } from './municipality.entity';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class MunicipalityService implements OnModuleInit {
  constructor(
    @InjectRepository(Municipality)
    private municipalityRepository: Repository<Municipality>,
  ) {}

  async onModuleInit() {
    await this.loadMunicipalities();
  }

  async loadMunicipalities() {
    const municipalities = [];
    fs.createReadStream('municipios-2019.csv')
      .pipe(csvParser())
      .on('data', (data) => municipalities.push(data))
      .on('end', async () => {
        for (const municipality of municipalities) {
          await this.municipalityRepository.save({
            code: municipality['codigo_ibge'],
            name: municipality['nome'],
          });
        }
      });
  }
  
}
