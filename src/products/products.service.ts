import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDto } from "./products.dto";

@Injectable()
export class ProductsService{

    constructor(
        private readonly productsRepository: ProductsRepository){}

    getProduct(page:number , limit:number){
        const products = this.productsRepository.getProducts(page, limit)
        return products
    }

    getProductById(id:string){
        return this.productsRepository.getProductById(id)
    }

    createProduct(product:ProductDto){
        return this.productsRepository.createProduct(product)
    }

    updateProduct(id:string, product:any){
        return this.productsRepository.updateProduct(id, product)
    }

    deleteProduct(id:string){
        return this.productsRepository.deleteProduct(id)
    }

}