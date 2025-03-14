import { Order } from "../orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity({name:"users"})
export class User{

    /** 
    * El ID de usuario se genera de forma automatica
    * - Es del tipo UUID
    */
    @PrimaryGeneratedColumn("uuid")
    id:string

    /** 
    * @example TestUser
    */
    @Column({type:"varchar",length:50})
    name:string

    /** 
    * @example testuser@example.com
    */
    @Column({type:"varchar", length:50, unique:true})
    email:string
    
    /** 
    * @example aaBBcc123!
    */
    @Column({type:"varchar", length:100})
    password:string

    /** 
    * @example 1234567891
    */
    @Column({type:"int"})
    phone:number

    /** 
    * @example Ejemplo
    */
    @Column({type:"varchar", length:50, nullable:true})
    country:string

    /** 
    * @example CalleEjemplo
    */
    @Column({type:"text", nullable:true})
    address:string

    /** 
    * @example Ejemplo
    */    
    @Column({type:"varchar", length:50, nullable:true})
    city:string

    /** 
    * True: El usario tiene permisos de administrador
    * - False: El usuario solo tiene permisos de usuario
    * - Por defecto es False
    */
    @Column({default:Role.User})
    isAdmin:Role

    /** 
    * Listado de ordenes de compra del usuario
    */   
    //! user Relacion 1:N con orders_id
    @OneToMany(()=> Order, (order) => order.user)
    orders: Order[] //* RECIBO TODAS LA ORDENES ASOCIADAS A ESE USUARIO

}