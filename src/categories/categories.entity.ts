import { Product } from "../products/products.entity"
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:"categories"})
export class Category{

    /**
    * El ID de la categoria se genera de forma automatica
    * - Es del tipo UUID
    */
    @PrimaryGeneratedColumn("uuid")
    id:string

    /**
    * @example "Phone"
    */
    @Column({type:"varchar", length:50, nullable:false, unique:true})
    name:string

    /**
    * Listado de productos que pertenecen a esta categoria
    */
    //! relacion 1:N con productos
    @OneToMany(()=> Product, (product)=>product.category)
    @JoinColumn()
    products: Product[] 

}