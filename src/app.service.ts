import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola! Te damos la bienvenida a nuestra app!';
  }
}
