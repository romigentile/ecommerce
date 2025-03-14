import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import typeOrmConfig from './config/typeorm';
import { OrdersModule } from './orders/orders.module';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { SeederModule } from './seeder/seeder.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, load: [typeOrmConfig]}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:(ConfigService: ConfigService) => ConfigService.get("typeorm")}), 
    UsersModule, ProductsModule, AuthModule, CategoriesModule, OrdersModule, FilesModule, SeederModule,
    JwtModule.register({ //* CONFIGURO COMO SERA EL REGISTRO
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions:{ //* LE DOY MAS CARACTERISTICAS, COMO DURACION SE SESION
        expiresIn:"1h"
      }
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
