import { Controller, Get } from '@nestjs/common';
import { ProjectService } from '../services/project.service';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return "Hello World!";
  }
}
