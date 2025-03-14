import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from "@nestjs/swagger";

@ApiTags("home")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   *  Ruta de bienvenida
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
