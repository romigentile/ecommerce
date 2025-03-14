import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {

    constructor(
        private readonly filesRepository: FilesRepository,
        @InjectRepository(Product) private productsRepository: Repository<Product> 
    ){}

    async uploadImage(file:Express.Multer.File, productId:string){

        const product = await this.productsRepository.findOneBy({id: productId})

        //! EXISTE EL PRODUCTO ??
        if(!product) throw new NotFoundException(`El producto con ID: ${productId} no existe.`)

        const newImg = await this.filesRepository.uploadImage(file) //*SUBO LA IMG

        await this.productsRepository.update(productId, {imgUrl: newImg.secure_url}) //*ACTUALIZO EN EL PRODUCTO CON LA NUEVA IMGQUE ESTA EN LA SECURE URL

        return "Producto actualizado con exito"
    }

}
