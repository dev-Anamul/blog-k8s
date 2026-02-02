import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class DateService {
  getCurrentDate(): string {
    return dayjs().format('dddd, MMMM D, YYYY h:mm ');
  }

  getCurrentTime(): string {
    return dayjs().format('HH:mm:ss');
  }
}
