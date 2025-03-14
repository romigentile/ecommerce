import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { CategoriesRepository } from './categories.repository';
import { Product } from 'src/products/products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])], //* LE VOY A DAR LA ENTIDAD
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository],
    exports: [CategoriesRepository]
})
export class CategoriesModule {}
