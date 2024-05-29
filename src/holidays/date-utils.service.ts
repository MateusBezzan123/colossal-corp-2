import { Injectable } from '@nestjs/common';

@Injectable()
export class DateUtilsService {
  calculateEaster(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = 1 + (h + l - 7 * m + 114) % 31;
    return new Date(year, month - 1, day);
  }

  calculateCarnival(year: number): Date {
    const easter = this.calculateEaster(year);
    easter.setDate(easter.getDate() - 47);
    return easter;
  }

  calculateCorpusChristi(year: number): Date {
    const easter = this.calculateEaster(year);
    easter.setDate(easter.getDate() + 60);
    return easter;
  }

  calculateGoodFriday(year: number): Date {
    const easter = this.calculateEaster(year);
    easter.setDate(easter.getDate() - 2);
    return easter;
  }
}
