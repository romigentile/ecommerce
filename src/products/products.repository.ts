import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Category } from "../categories/categories.entity";
import { ProductDto } from "./products.dto";

@Injectable()
export class ProductsRepository {

    constructor(
        @InjectRepository(Product) private productsRepository : Repository<Product>,
        @InjectRepository(Category) private categoriesRepository : Repository<Category>
    ){}


    async getProducts(page:number, limit:number) : Promise<Product[]>{

        let products = await this.productsRepository.find({relations: { category:true}}) //* ME TRAIGO EL NOMBRE DE LA CATEGORIA

        const start = (page-1) * limit
        const end = start + limit
        products = products.slice(start, end)

        return products
    }

    async getProductById(id:string){
        const productById = await this.productsRepository.findOne({where:{id}, relations:{category:true}})

        if(!productById) throw new NotFoundException(`El producto con ID: ${id} no existe.`) 

        return productById
    }

    async createProduct(newProduct: Partial<ProductDto>): Promise<Partial<Product>> {
        
        const existingProduct = await this.productsRepository.findOneBy({name:newProduct.name})

        if(existingProduct) throw new BadRequestException("Ya existe un producto con ese nombre")

        const existingCategory = await this.categoriesRepository.findOneBy({name: newProduct.category})

        if(!existingCategory){
            const newCategory = await this.categoriesRepository.create({name: newProduct.category})

            await this.categoriesRepository.save(newCategory)

            const product = new Product()
            product.name = newProduct.name
            product.description = newProduct.description
            product.price = newProduct.price
            product.imgUrl = newProduct.imgUrl
            product.stock = newProduct.stock
            product.category = newCategory
    
            return await this.productsRepository.save(product)

        }

        const product = new Product()
        product.name = newProduct.name
        product.description = newProduct.description
        product.price = newProduct.price
        product.imgUrl = newProduct.imgUrl
        product.stock = newProduct.stock
        product.category = existingCategory

        return await this.productsRepository.save(product)
    }

    async updateProduct(id:string, changeProduct:Partial<Product>){

        const findedProduct = await this.productsRepository.findOne({ where: { id }, relations: { category: true } });
    
        if (!findedProduct) throw new BadRequestException("El producto que desea actualizar no existe.");
    
        if (changeProduct.category) {
            const findedCategory = await this.categoriesRepository.findOne({ where: { name: String(changeProduct.category) } });
    
            if (!findedCategory) throw new BadRequestException("La categoría que desea asignar no existe. Debe crearla.");
    
            //? Reemplaza la cadena de categoría con la entidad de categoría
            changeProduct.category = findedCategory as any;
        }
    
        await this.productsRepository.update(id, changeProduct);
    
        const updatedProduct = await this.productsRepository.findOne({ where: { id }, relations: { category: true } });
    
        return updatedProduct ? "El producto ha sido actualizado con éxito" : "Error al actualizar el producto";
    }

    async deleteProduct(id:string){
        const productFinded = this.getProductById(id)

        await this.productsRepository.delete(id)

        return productFinded
    }

}