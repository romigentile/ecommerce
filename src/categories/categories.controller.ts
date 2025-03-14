import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from "@nestjs/swagger";
import { CategoryDto } from 'src/products/products.dto';
import { Category } from './categories.entity';

@ApiTags("categories")
@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService){}

    /**
     * Ruta para obtener todas las categorias
     */
    @Get()
    getCategories(){
        return this.categoriesService.getCategories()
    }

    /**
     * Ruta para obtener una categoría por ID
     */
    @Get(":id")
    getCategoryById(@Param("id", ParseUUIDPipe) id:string){
        return this.categoriesService.getCategoryById(id)
    }

    /**
     * Ruta de creacion de categorias
     * - Si crea una categoría y se le indica que ya existe, modifique el nombre agregando numeros aleatorios, manteniendo la extructura TestCategory.
     */
    @Post("create")
    async createCategory(@Body() newCategory : CategoryDto){
        return await this.categoriesService.createCategory(newCategory)
    }

    /**
     * Ruta para actualizar una categoria
     * - Si la categoria tiene productos asociados, no se podrá actualizar. Se deberá actualizar primero el producto, de esa manera se crea la nueva categoria y podrá eliminar la anterior.
     */
    @Put(":id")
    async updateCategory(@Param("id", ParseUUIDPipe) id:string, @Body() category:any){
        return await this.categoriesService.updateCategory(id, category)
    }

    /**
     * Ruta para eliminar una categoria
     * - Solo se prodrán eliminar categorías que no estén asociadas a productos.
     * - En ese caso, primero deberá eliminar el producto, o asignarle una nueva categoria.
     */
    @Delete("/:id")
    deleteCategory(@Param("id", ParseUUIDPipe) id:string){
        return this.categoriesService.deleteCategory(id)
    }
    
}
