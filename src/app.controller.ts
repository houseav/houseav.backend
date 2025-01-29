import { Controller, Get } from '@nestjs/common';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  @Get()
  @Public()
  async getTestRunning() {
    return '[NestJS] Server is running';
  }
}
