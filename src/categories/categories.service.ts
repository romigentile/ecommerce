import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoryDto } from 'src/products/products.dto';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {

    constructor(private categoriesRepository: CategoriesRepository){}

    getCategories(){
        return this.categoriesRepository.getCategories()
    }

    getCategoryById(id:string){
        return this.categoriesRepository.getCategoryById(id)
    }

    createCategory(newCategory:CategoryDto){
        return this.categoriesRepository.createCategory(newCategory)
    }

    updateCategory(id:string, category:any){
        return this.categoriesRepository.updateCategory(id, category)
    }

    deleteCategory(id:string){
        return this.categoriesRepository.deleteCategory(id)
    }

}
