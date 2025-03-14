import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { Repository } from "typeorm";
import { OrderDetail } from "../orderDetails/orderDetails.entity";
import { User } from "../users/users.entity";
import { Product } from "../products/products.entity";


@Injectable()
export class OrdersRepository{

    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail) private orderDetailsRepository: Repository<OrderDetail>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Product) private productsRepository: Repository<Product>){}


        async addOrder(userId:string, products: any){
            let total = 0
            //! EXISTE USUARIO?
            const user = await this.usersRepository.findOneBy({id: userId})
            if(!user) throw new NotFoundException(`El usuario con ID ${userId} no existe`) 
            
            //!Creo la orden si existe
            const order = new Order()
            order.date = new Date()
            order.user = user

            const newOrder = await this.ordersRepository.save(order) //* AGREGO A DB

            //! segun los id de productos que recibi los asocio
            const productsArray: Product[] = [];

            //! VERIFICO QUE LOS PRODUCTOS EXISTAN
            for (const element of products) {
                const product = await this.productsRepository.findOneBy({ id: element.id });
                if (!product) {
                    throw new NotFoundException(`El producto con id ${element.id} no ha sido encontrado.`)
                }

                if(!product.stock) throw new NotFoundException(`El producto con id ${element.id} no cuenta con stock disponible.`)

            //! SUMA AL TOTAL
            total += Number(product.price);

            await this.productsRepository.update({ id: element.id }, { stock: product.stock - 1 });

            //! PUSHEO AL ARRAY
            productsArray.push(product);
        }
            //! CREO LA ORDERDETAIL Y LA GUARDO
            const orderDetail = new OrderDetail()
            orderDetail.price = Number(Number(total).toFixed(2))
            orderDetail.products = productsArray
            orderDetail.order = newOrder

            await this.orderDetailsRepository.save(orderDetail) //* GUARDO EN DB
            
            //! COMPRA CON LA INFO DE LOS PRODUCTOS
            return await this.ordersRepository.find({where:{id: newOrder.id}, relations:{ orderDetail:true }})
        }

        async getOrder(id:string){
            const order = await this.ordersRepository.findOne({where:{id}, relations: {orderDetail:{products: true}}})

            if(!order) throw new NotFoundException(`La orden con ID ${id} no ha sido encontrada`)

            return order
        }

}