import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  providers: [SeederService],
})
export class SeederModule {}
