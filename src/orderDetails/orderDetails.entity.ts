import { Order } from "../orders/orders.entity"
import { Product } from "../products/products.entity"
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:"orderDetails"})
export class OrderDetail{

    /**
     * El ID del detalle de la orden se genera de forma automatica
     * - Es del tipo UUID
     */
    @PrimaryGeneratedColumn("uuid")
    id:string 

    /**
     * El precio sera la suma de los precios de los productos asociados
     */
    @Column({type:"decimal", precision:10, scale:2, nullable:false})
    price: number
    
    /**
     * Se vincula la orden asoaciada al detalle de la orden
     */
    //! order_id: Relación 1:1 con orders.
    @OneToOne(()=> Order, (order)=>order)
    @JoinColumn({name: "order_id"})
    order : Order 

    /**
     * Se asocian los productos que pertenecen a la orden
     */
    //! Relación N:N con products.
    @ManyToMany(()=> Product)
    @JoinTable({
        name: "orderDetails_products",
        joinColumn:{
            name: "product_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn:{
            name: "orderDerail_id",
            referencedColumnName: "id"
        } 
    })
    products : Product[]
}