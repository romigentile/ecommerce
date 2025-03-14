import { OrderDetail } from "../orderDetails/orderDetails.entity"
import { User } from "../users/users.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:"orders"})
export class Order{

    /** 
    * El ID de la orden debe ser del tipo UUID 
    * - Se genera de forma automatica
    */
    @PrimaryGeneratedColumn("uuid")
    id:string

    /** 
    * Fecha en la que se da de alta la compra.
    * - Se genera de forma automatica
    */
    @Column()
    date: Date

    /** 
    * Se asoacia el ID del usuario dueño de la orden de compra
    */    
    //! user_id:  (Relación N:1) con users.
    @ManyToOne(()=> User, (user) => user.orders)
    @JoinColumn({name:"user_id"})
    user : User //* RECIBO QUIEN ES EL DUEÑO DE LA ORDEN

    /** 
    * Se asoacia el ID del detalle de la orden de compra
    */   
    @OneToOne(()=> OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail : OrderDetail

}