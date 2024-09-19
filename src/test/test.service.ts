import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getAllTest() {
    return '[NestJS] Server is running';
  }
}
