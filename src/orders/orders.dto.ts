import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "../products/products.entity"

export class OrderDto{
    
    /** 
    * El ID del usuario debe ser del tipo UUID 
    * @example "5ba255fd-f78f-4c69-9bfe-102740f14fdf"
    */
    @IsNotEmpty()
    @IsUUID()
    userId:string

    /** 
    * Listado de productos que contiene la orden 
    */
    @IsArray()
    @ArrayMinSize(1)
    products:Partial<Product[]>
}