import { Injectable, OnModuleInit } from '@nestjs/common';
import * as data from '../utils/data.json';
import { CategoriesRepository } from 'src/categories/categories.repository';
import { ProductsRepository } from 'src/products/products.repository';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    try {
      await this.seedCategories();
      await this.seedProducts();
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  }

  async seedCategories() {
    const categories = Array.from(new Set(data.map(item => item.category)));

    for (const category of categories) {
      await this.categoriesRepository.createCategory({category});
    }
  }

  async seedProducts() {
    for (const item of data) {
      await this.productsRepository.createProduct({
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        category: item.category,
        imgUrl: item.imgUrl,
      });
    }
  }
}
