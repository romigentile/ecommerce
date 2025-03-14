import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class ProductDto{

    /** 
    * @example TestProduct
    */
        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        @MaxLength(80)
        name:string

    /** 
    * @example TestProductDescription
    */
    @IsNotEmpty()
    @IsString()
    description:string   
    
    /** 
    * El precio contiene una precision de 10 y una escala de 2 
    * @example $1234.56
    */
   @IsNotEmpty()
   @IsNumber()
   price:number
   
    /** 
    * @example 10
    */
    @IsNotEmpty()
    @IsNumber()
    stock:number
    
    /**
     * Debe colocar la URL del producto o se asignara imagen por defecto
     */
    @IsOptional()
    @IsString()
    imgUrl:string

    /**
     * Categoria del producto, si no existe se crea nueva.
     * @example TestCategory
     */
    @IsNotEmpty()
    @IsString()
    category:string
        
}

export class CategoryDto extends PickType(ProductDto, ["category"]) {
}
