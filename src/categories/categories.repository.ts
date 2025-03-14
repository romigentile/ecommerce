import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./categories.entity";
import { CategoryDto } from "src/products/products.dto";
import { Product } from "src/products/products.entity";

@Injectable()
export class CategoriesRepository{
    constructor(
        @InjectRepository(Category) private categoriesRepository: Repository<Category>,
        @InjectRepository(Product) private productsRepository: Repository<Product>){}

    async getCategories(){
        return await this.categoriesRepository.find({relations: {products:true}})
    }

    async createCategory(newCategory:CategoryDto){

        const existingCategory = await this.categoriesRepository.findOneBy({name: newCategory.category})

        if(existingCategory) throw new BadRequestException("Ya existe una categoria con ese nombre")

        const createdCategory = new Category()
        createdCategory.name = newCategory.category

        return await this.categoriesRepository.save(createdCategory)

    }

    async updateCategory(id:string, category:any){

        const findedCategory = await this.categoriesRepository.findOne({where: {id}, relations: {products:true}})

        if(!findedCategory) throw new BadRequestException("La categoria que desea modificar no existe")
        
        if(findedCategory.products.length > 0) throw new BadRequestException("La categoria que desea modificar tiene productos asociados, asegurese de eliminarlos o modificarlos antes de modificar la categoria")

        await this.categoriesRepository.update(id, category)

        return `La categoria ${findedCategory.name} se ha actualizado con exito.`

    }

    async deleteCategory(id:string){

        const findedCategory = await this.categoriesRepository.findOne({where:{id}, relations: {products: true} })
        
        if(findedCategory.products.length > 0) throw new BadRequestException("La categoria que desea eliminar tiene productos asociados, asegurese de eliminarlos o modificarlos antes de eliminar la categoria")

        if(!findedCategory) throw new BadRequestException("La categoria que desea eliminar no existe")

        await this.categoriesRepository.remove(findedCategory)

        return `La categoria ${findedCategory.name} se ha eliminado con exito`
    }

    async getCategoryById(id:string){
        return await this.categoriesRepository.findOne({where: {id}, relations: {products:true}})
    }
}