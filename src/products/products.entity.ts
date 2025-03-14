import { Category } from "../categories/categories.entity"
import { OrderDetail } from "../orderDetails/orderDetails.entity"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity({name:"products"})
export class Product{

    /** 
    * El ID de producto se genera de forma automatica
    * - Es del tipo UUID
    */
    @PrimaryGeneratedColumn("uuid")
    id:string

    /** 
    * @example TestProduct
    */
    @Column({type:"varchar", length:50, nullable:false, unique:true})
    name:string

    /** 
    * @example TestProductDescription
    */
    @Column({type:"text", nullable:false})
    description:string

    /** 
    * El precio contiene una precision de 10 y una escala de 2 
    * @example $1234.56
    */
    @Column({type:"decimal", precision:10, scale:2, nullable:false})
    price:number

    /** 
    * @example 10
    */
    @Column({type:"int", nullable:false})
    stock:number

    /** 
    *  Por defecto se asigna imagen descriptiva "sin foto disponible" - Si la quiere actualizar mediante un archivo debe ir a uploadImg/:id o colocar una URL valida
    * @example "https://test.com/test.png"
    */    
    @Column({type:"text", default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGGV_B52YMsOJEg4yb99HiJtGYZAIOobLJoqUAdi_2HQ&s"})
    imgUrl:string

    /** 
    * Categoria del producto
    */
    //! category_id (relacion N:1)
    @ManyToOne(()=> Category, (category)=>category.products)
    @JoinColumn({name: "category_id"}) 
    category: Category

    /** 
    * Listado de ordenes en las que aparecen los productos
    */
    //! orderDetails relacion N:N, 
    @ManyToMany(()=> OrderDetail, (orderDetail)=>orderDetail.products)
    orderDetails: OrderDetail[] //* TRAIGO TODAS LAS ORDENES EN DONDE ESTA ESE PRODUCTO

}