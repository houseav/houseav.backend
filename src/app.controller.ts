import { Controller, Get } from '@nestjs/common';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  @Get()
  @Public()
  async getTestRunning() {
    console.log(process.env.NODE_ENV);
    return `[NestJS] Server is running: ${process.env.NODE_ENV}`;
  }
}
